"use client";
// Cmp
import FormSubmit from "@/components/form/form-submit";
import FormTextarea from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
// Hooks
import { useAction } from "@/hooks/use-action";
import { useParams } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
// Server action
import { createCard } from "@/actions/create-card";
// Function
import getRegularTime from "@/lib/get-regular-time";
// Types
import { forwardRef, useEffect, useRef } from "react";
import type { ElementRef, KeyboardEventHandler } from "react";
interface ICardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}
const CardForm = forwardRef<HTMLTextAreaElement, ICardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);
    const { execute, resetError, fieldErrors } = useAction(createCard, {
      onSuccess: () => {
        toast.success(`Card created`, {
          description: getRegularTime(),
        }),
          disableEditing();
      },
      onError: toast.error,
    });
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };
    const handleTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };
    const handleSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;
      execute({ title, listId, boardId });
    };
    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", handleKeyDown);
    useEffect(() => {
      if (!isEditing) {
        resetError();
      }
    }, [isEditing]);
    if (isEditing) {
      return (
        <form
          className="m-1 py-0.5 px-1 space-x-4"
          action={handleSubmit}
          ref={formRef}
        >
          <FormTextarea
            autoFocus
            name="title"
            id="title"
            onKeyDown={handleTextareaKeyDown}
            placeholder="Enter a title for this card..."
            errors={fieldErrors}
          />
          <input hidden id="listId" name="listId" value={listId} readOnly />
          <div className="flex items-center gap-x-1 w-full !ml-0 mt-2">
            <FormSubmit>Add card</FormSubmit>
            <Button
              onClick={disableEditing}
              size="sm"
              variant="ghost"
              className="group"
            >
              <X className="size-5 text-primary-foreground group-hover:text-foreground" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-primary-foreground text-sm"
          size="sm"
          variant="glass"
        >
          <Plus className="size-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
export default CardForm;
