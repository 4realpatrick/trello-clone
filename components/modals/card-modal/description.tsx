"use client";
// Cmp
import FormSubmit from "@/components/form/form-submit";
import FormTextarea from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlignLeft } from "lucide-react";
// Server action
import { updateCard } from "@/actions/update-card";
// Hooks
import { useAction } from "@/hooks/use-action";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
// Utils
import getRegularTime from "@/lib/get-regular-time";
// Types
import { TCardWithList } from "@/types";
interface IDescriptionProps {
  data: TCardWithList;
}
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

const Description: React.FC<IDescriptionProps> & { Skeleton: React.FC } = ({
  data,
}) => {
  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast.success(`Card ${data.title}'s description updated`, {
        description: getRegularTime(),
      });
      disableEditing();
    },
    onError: toast.error,
  });
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const queryClient = useQueryClient();
  const params = useParams();
  const enableEditing = () => {
    setIsEditing(true);
  };
  const disableEditing = () => {
    setIsEditing(false);
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };
  useEventListener("keydown", handleKeyDown);
  useOnClickOutside(formRef, disableEditing);
  const handleSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;
    if (!description) {
      disableEditing();
    }
    execute({
      originalTitle: data.title,
      title: data.title,
      originalDescription: data.description,
      id: data.id,
      description,
      boardId,
    });
  };
  return (
    <div className="flex item-start gap-x-3 w-full">
      <AlignLeft className="size-5 mt-0.5 text-foreground" />
      <div className="w-full">
        <p className="font-semibold mb-2 text-primary">Description</p>
        {isEditing ? (
          <form ref={formRef} className="space-y-2" action={handleSubmit}>
            <FormTextarea
              autoFocus
              errors={fieldErrors}
              ref={textareaRef}
              id="description"
              name="description"
              className="w-full mt-2"
              placeholder="Add a more detailed description..."
              defaultValue={data.description || undefined}
            />
            <div className="flex item-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button type="button" variant="ghost" onClick={disableEditing}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] text-sm font-medium py-3 px-3.5 rounded-md bg-primary/25 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur"
          >
            {data.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = () => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="size-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px] bg-neutral-200" />
      </div>
    </div>
  );
};
export default Description;
