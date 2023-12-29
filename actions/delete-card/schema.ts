import { z } from "zod";

export const DeleteCard = z.object({
  listTitle: z.string(),
  id: z.string(),
  boardId: z.string(),
});
