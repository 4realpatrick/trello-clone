"use client";
// Cmp
import {
  Popover,
  PopoverClose,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, X } from "lucide-react";
import FormSubmit from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
// Hooks
import { useAction } from "@/hooks/use-action";
import { useRef } from "react";
// Server action
import { deleteList } from "@/actions/delete-list";
import { copyList } from "@/actions/copy-list";
// Function
import getRegularTime from "@/lib/get-regular-time";
// Types
import { List } from "@prisma/client";
import type { ElementRef } from "react";
interface IListOptionsProps {
  data: List;
  onAddCard: () => void;
}
const ListOptions: React.FC<IListOptionsProps> = ({ data, onAddCard }) => {
  const { execute: executeDelete, isLoading: isDeleting } = useAction(
    deleteList,
    {
      onSuccess(data) {
        toast.success(`List ${data.title} deleted`, {
          description: getRegularTime(),
        });
      },
      onError: toast.error,
    }
  );
  const { execute: executeCopy } = useAction(copyList, {
    onSuccess(data) {
      toast.success(`Copy success`, {
        description: getRegularTime(),
      });
    },
    onError: toast.error,
  });
  const closeRef = useRef<ElementRef<"button">>(null);
  const handleDeleteList = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    executeDelete({
      id,
      boardId,
      boardTitle: data.title,
    });
    closeRef.current!.click();
  };
  const handleCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    executeCopy({ id, boardId });
    closeRef.current!.click();
  };
  return (
    <Popover>
      <PopoverTrigger className="flex-1 px-2 pt-2">
        <MoreHorizontal className="size-4 text-primary-foreground hover:text-foreground transition" />
      </PopoverTrigger>
      <PopoverContent
        className="px-0 pt-3 pb-3 rounded-sm"
        side="bottom"
        align="start"
      >
        <div className="text-sm font-medium text-center text-neutral-600">
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="size-auto p-2 absolute top-1 right-2"
            variant="ghost"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>
        <Button
          disabled={isDeleting}
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 mt-3 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add card
        </Button>
        <form action={handleCopy}>
          <input hidden name="id" id="id" value={data.id} readOnly />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
            readOnly
          />
          <FormSubmit
            disabled={isDeleting}
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list
          </FormSubmit>
        </form>
        <Separator />
        <form action={handleDeleteList}>
          <input hidden name="id" id="id" value={data.id} readOnly />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
            readOnly
          />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:text-rose-500"
          >
            <Trash2 className="size-4 mr-2" />
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
