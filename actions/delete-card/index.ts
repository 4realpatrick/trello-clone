"use server";

import { auth } from "@clerk/nextjs";
import { TInputType, TReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";

const handler = async (data: TInputType): Promise<TReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, boardId } = data;
  let card;
  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });
  } catch (error) {
    console.log("Internal Error Found in delete-card", error);
    return {
      error: "Failed to delete",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: card,
  };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
