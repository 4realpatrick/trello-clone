import { z } from "zod";
import { Board } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { UpdateBoard } from "./schema";

export type TInputType = z.infer<typeof UpdateBoard>;
export type TReturnType = ActionState<TInputType, Board>;
