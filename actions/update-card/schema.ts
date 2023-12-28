import { z } from "zod";

export const UpdateCard = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(1, {
      message: "Title is required",
    })
    .max(100, {
      message: "Title only accept up to 100 chars",
    }),
  id: z.string(),
  boardId: z.string(),
  description: z.optional(
    z.string({
      required_error: "Description is required",
      invalid_type_error: "Description is required",
    })
  ),
});
