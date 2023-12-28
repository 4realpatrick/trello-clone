import { z } from "zod";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";

export type TInputType = z.infer<typeof UpdateCardOrder>;
export type TReturnType = ActionState<TInputType, Card[]>;
