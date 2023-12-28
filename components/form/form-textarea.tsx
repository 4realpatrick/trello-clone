"use client";

import {
  KeyboardEventHandler,
  TextareaHTMLAttributes,
  forwardRef,
} from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import FormErrors from "./form-errors";
import { useFormStatus } from "react-dom";

interface IFormTextareProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  errors?: Record<string, string[] | undefined>;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement | undefined>;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, IFormTextareProps>(
  (props, ref) => {
    const { pending } = useFormStatus();
    const { id, label, className = "", errors, disabled, ...rest } = props;
    return (
      <div className="space-y-2 w-full ">
        <div className="space-y-1 w-full">
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}
          <Textarea
            {...rest}
            className={cn(
              "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
            aria-describedby={`${id}-errpr`}
            disabled={pending || disabled}
          />
        </div>
        <FormErrors errors={errors} id={id} />
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
export default FormTextarea;
