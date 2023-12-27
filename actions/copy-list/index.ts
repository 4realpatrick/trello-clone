"use server";

import { auth } from "@clerk/nextjs";
import { TInputType, TReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyList } from "./schema";

const handler = async (data: TInputType): Promise<TReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, boardId } = data;
  let list;
  let card = [];
  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });
    if (!listToCopy) {
      return {
        error: "List not found",
      };
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });
    const newOrder = lastList ? lastList.order : 1;
    console.log(listToCopy, newOrder);

    list = await db.list.create({
      data: {
        title: `${listToCopy.title} - Copy`,
        boardId: listToCopy.boardId,
        order: newOrder,
      },
      include: {
        cards: true,
      },
    });
    // if (listToCopy.cards.length) {
    //   card = await db.card.createMany({
    //     data: listToCopy.cards.map((card) => ({
    //       title: card.title,
    //       description: card.description,
    //       order: card.order,
    //       listId: list.id
    //     }))
    //   })
    // }
  } catch (error) {
    console.log("Internal Error Found in copy-list", error);
    return {
      error: "Failed to copy",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
};

export const copyList = createSafeAction(CopyList, handler);
