import { z } from "zod";
import { List } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { DeleteList } from "./schema";

export type TInputType = z.infer<typeof DeleteList>;
export type TReturnType = ActionState<TInputType, List>;
