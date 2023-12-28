import { z } from "zod";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";

export type TInputType = z.infer<typeof DeleteCard>;
export type TReturnType = ActionState<TInputType, Card>;
