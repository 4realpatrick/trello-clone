import { z } from "zod";
import { ActionState } from "@/lib/create-safe-action";
import { StripeRedirect } from "./schema";

export type TInputType = z.infer<typeof StripeRedirect>;
export type TReturnType = ActionState<TInputType, string>;
