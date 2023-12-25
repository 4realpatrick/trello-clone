import { z } from "zod";
import { Board } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

export type TInputType = z.infer<typeof CreateBoard>;
export type TReturnType = ActionState<TInputType, Board>;
