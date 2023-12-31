import { z } from "zod";

export const UpdateList = z.object({
  originalTitle: z.string(),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Title is too short",
    })
    .max(50, {
      message: "Title only accept up to 50 chars",
    }),
  id: z.string(),
  boardId: z.string(),
});
