"use client";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow,
} from "../ui/popover";
import FormInput from "./form-input";
import FormSubmit from "./form-submit";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import FormPicker from "./form-picker";
// Hooks
import { useAction } from "@/hooks/use-action";
import { useRef } from "react";
import { useRouter } from "next/navigation";
// Server action
import { createBoard } from "@/actions/create-board";
// Function
import dayjs from "dayjs";
// Types
import type { ElementRef } from "react";
interface IFormPopverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}
const FormPopover: React.FC<IFormPopverProps> = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();
  const { execute, resetError, fieldErrors } = useAction(createBoard, {
    onSuccess(data) {
      closeRef.current?.click();
      toast.success("Board created", {
        duration: 3000,
        description: dayjs().format("dddd, MMMM D, YYYY h:mm A"),
        onAutoClose(toast) {
          router.push(`/board/${data.id}`);
        },
      });
    },
    onError(error) {
      toast.error(error);
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
  };
  return (
    <Popover onOpenChange={resetError}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <PopoverArrow />
        <div className="text-sm font-medium text-center text-neutral-700 pb-5">
          Create board
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className="size-[auto] p-2 absolute top-2 right-2 text-neutral-600 rounded-full"
            variant="ghost"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>
        <form className="space-y-4" action={onSubmit}>
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
