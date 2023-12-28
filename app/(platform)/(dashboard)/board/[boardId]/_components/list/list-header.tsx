"use client";
// Cmp
import FormInput from "@/components/form/form-input";
import { toast } from "sonner";
import ListOptions from "./list-options";
import Hint from "@/components/hint";
// Hooks
import { useState, useRef, useEffect } from "react";
import { useEventListener } from "usehooks-ts";
import { useAction } from "@/hooks/use-action";
// Server action
import { updateList } from "@/actions/update-list";
// Function
import getRegularTime from "@/lib/get-regular-time";
// Types
import { List } from "@prisma/client";
import type { ElementRef } from "react";
interface IListHeaderProps {
  data: List;
  onAddCard: () => void;
}

const ListHeader: React.FC<IListHeaderProps> = ({ data, onAddCard }) => {
  const { execute, resetError, isLoading } = useAction(updateList, {
    onSuccess(data) {
      toast.success(`Rename to "${data.title}" successfully`, {
        description: getRegularTime(),
      });
      setTitle(data.title);
      disableEditing();
    },
    onError: toast.error,
    onFieldError(error) {
      toast.error("Update failed", { description: error["title"]![0] });
      setTitle(data.title);
      disableEditing();
    },
  });
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const enableEditing = () => {
    setIsEditing(true);
  };
  const disableEditing = () => {
    setIsEditing(false);
  };
  const handleBlur = () => {
    formRef.current?.requestSubmit();
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };
  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    if (title === data.title) {
      return disableEditing();
    }
    execute({
      title,
      id,
      boardId,
    });
  };
  useEffect(() => {
    if (!isEditing) {
      resetError();
    }
  }, [isEditing]);
  useEventListener("keydown", handleKeyDown);
  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form className="py-[-6px] w-full" action={handleSubmit} ref={formRef}>
          <input hidden id="id" name="id" value={data.id} readOnly />
          <input
            hidden
            id="boardId"
            name="boardId"
            value={data.boardId}
            readOnly
          />
          <FormInput
            disabled={isLoading}
            autoFocus
            onBlur={handleBlur}
            id="title"
            placeholder="Enter list title.."
            defaultValue={title}
            className="!text-sm px-[7px] py-1 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-background h-6 w-full"
          />
          <button hidden type="submit" />
        </form>
      ) : (
        <Hint descrption="Click to change title" align="start" asChild>
          <div
            className="w-full text-sm px-2.5 py-1 h-6 font-medium border-transparent text-primary-foreground cursor-pointer truncate"
            onClick={enableEditing}
          >
            {data.title}
          </div>
        </Hint>
      )}
      <ListOptions onAddCard={onAddCard} data={data} />
    </div>
  );
};

export default ListHeader;
