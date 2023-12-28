import { z } from "zod";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CopyCard } from "./schema";

export type TInputType = z.infer<typeof CopyCard>;
export type TReturnType = ActionState<TInputType, Card>;
