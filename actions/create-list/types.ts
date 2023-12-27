import { z } from "zod";
import { List } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreateList } from "./schema";

export type TInputType = z.infer<typeof CreateList>;
export type TReturnType = ActionState<TInputType, List>;
