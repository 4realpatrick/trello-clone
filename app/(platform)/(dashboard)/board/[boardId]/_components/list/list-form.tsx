"use client";
// Cmp
import { Button } from "@/components/ui/button";
import ListWrapper from "../list-wrapper";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import FormInput from "@/components/form/form-input";
import FormSubmit from "@/components/form/form-submit";
// Hooks
import { useEffect, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams, useRouter } from "next/navigation";
import { useAction } from "@/hooks/use-action";
// Server action
import { createList } from "@/actions/create-list";
import { REGULAR_TYPE_TIME } from "@/constant/time";
// Types
import type { ElementRef } from "react";
const ListForm = () => {
  const router = useRouter();
  const { execute, fieldErrors, resetError } = useAction(createList, {
    onSuccess(data) {
      toast.success(`List ${data.title} created`, {
        description: REGULAR_TYPE_TIME,
      });
      disabledEditing();
      router.refresh();
    },
    onError: toast.error,
  });
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const enableEditing = () => {
    setIsEditing(true);
  };
  const disabledEditing = () => {
    setIsEditing(false);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disabledEditing();
    }
  };
  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    execute({
      title,
      boardId,
    });
  };
  // 编辑态消失时，重制一下error
  useEffect(() => {
    if (!isEditing) {
      resetError();
    }
  }, [isEditing]);
  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disabledEditing);
  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={handleSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-background space-y-4 shadow-md"
        >
          <FormInput
            autoFocus
            ref={inputRef}
            id="title"
            errors={fieldErrors}
            className="px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <input hidden value={params.boardId} name="boardId" readOnly />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button onClick={disabledEditing} size="sm" variant="ghost">
              <X className="size-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }
  return (
    <ListWrapper>
      <Button
        className="w-full rounded-sm p-3 flex items-center justify-start py-6"
        onClick={enableEditing}
      >
        <Plus className="size-4 md:size-6 mr-2 text-primary-foreground" />
        Add a list
      </Button>
    </ListWrapper>
  );
};

export default ListForm;
