"use client";
// Cmp
import Confirm from "@/components/confirm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Menu, X, Trash2 } from "lucide-react";
import { toast } from "sonner";
// Server action
import { deleteBoard } from "@/actions/delete-board";
// Hooks
import { useAction } from "@/hooks/use-action";

//Types
import { ChangeEventHandler, useState } from "react";
interface IBoardOptionsProps {
  id: string;
  title: string;
}
const BoardOptions: React.FC<IBoardOptionsProps> = ({ id, title }) => {
  const [confirmTitle, setConfirmTitle] = useState("");
  const { execute, isLoading } = useAction(deleteBoard, {
    onError(error) {
      toast.error(error);
    },
  });
  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setConfirmTitle(e.target.value);
  };
  const onDelete = () => {
    if (confirmTitle !== title) {
      toast.error("Input board title doesn't match");
      return;
    }
    execute({ id });
  };
  return (
    <Popover onOpenChange={() => setConfirmTitle("")}>
      <PopoverTrigger asChild>
        <Button className="size-auto p-2 group" variant="glass">
          <Menu
            className="size-4 group-hover:!text-primary text-background group-hover/navbar:text-foreground"
            strokeWidth={3}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600">
          Board actions
        </div>
        <PopoverClose asChild>
          <Button
            className="size-auto p-2 absolute top-1 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>
        <div className="mt-2">
          <Confirm
            title="Are you sure?"
            customDescription={
              <>
                <div className="bg-rose-200 text-rose-500 p-3 rounded-sm text-sm">
                  <span className="text-rose-700 mr-1">Warning:</span>
                  This action is not reversible. This will permanently delete
                  your board and remove your data from our servers.
                </div>
                <div className="mt-3 text-sm">
                  Enter the board name{" "}
                  <span className="font-extrabold text-rose-500 px-1">
                    {title}
                  </span>{" "}
                  to delete this permanently
                </div>
                <Input
                  className="mt-2"
                  value={confirmTitle}
                  onChange={handleTitleChange}
                />
              </>
            }
            confirmEle={
              <Button
                className="bg-rose-500 hover:bg-rose-400"
                onClick={onDelete}
              >
                Continue
              </Button>
            }
          >
            <Button
              variant="ghost"
              className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:text-rose-500"
              disabled={isLoading}
            >
              <Trash2 className="size-4 mr-2" />
              Delete this board
            </Button>
          </Confirm>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
