import { z } from "zod";
import { List } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CopyList } from "./schema";

export type TInputType = z.infer<typeof CopyList>;
export type TReturnType = ActionState<TInputType, List>;
