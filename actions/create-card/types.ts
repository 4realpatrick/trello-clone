import { z } from "zod";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreateCard } from "./schema";

export type TInputType = z.infer<typeof CreateCard>;
export type TReturnType = ActionState<TInputType, Card>;
