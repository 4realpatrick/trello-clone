import { z } from "zod";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { UpdateCard } from "./schema";

export type TInputType = z.infer<typeof UpdateCard>;
export type TReturnType = ActionState<TInputType, Card>;
