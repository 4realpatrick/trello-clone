import { z } from "zod";
import { List } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { UpdateList } from "./schema";

export type TInputType = z.infer<typeof UpdateList>;
export type TReturnType = ActionState<TInputType, List>;
