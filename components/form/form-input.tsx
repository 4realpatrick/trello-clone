"use client";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
// Cmp
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormErrors from "./form-errors";
// Utils
import { cn } from "@/lib/utils";

interface IFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  errors?: Record<string, string[] | undefined>;
  onBlur?: () => void;
}
const FormInput = forwardRef<HTMLInputElement, IFormInputProps>(
  (props, ref) => {
    const { label, id, disabled, className = "", errors } = props;
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {!!label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}
          <Input
            {...props}
            disabled={pending || disabled}
            ref={ref}
            className={cn("text-sm px-2 -y-1 h-7", className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormInput.displayName = "FormInpput";
export default FormInput;
