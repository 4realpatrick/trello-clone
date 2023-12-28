"use server";

import { auth } from "@clerk/nextjs";
import { TInputType, TReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCard } from "./schema";

const handler = async (data: TInputType): Promise<TReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, boardId, ...rest } = data;
  let card;
  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...rest,
      },
    });
  } catch (error) {
    console.log("Internal Error Found in update-card", error);
    return {
      error: "Failed to update",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
