"use client";
// Cmp
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Copy, Trash } from "lucide-react";
import { toast } from "sonner";
// Hooks
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import { useParams } from "next/navigation";
// Utils
import getRegularTime from "@/lib/get-regular-time";
// Server action
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
// Types
import type { TCardWithList } from "@/types";
interface IActionsProps {
  data: TCardWithList;
}
const Actions: React.FC<IActionsProps> & { Skeleton: React.FC } = ({
  data,
}) => {
  const cardModal = useCardModal();
  const params = useParams();
  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess(data) {
        toast.success(`Card ${data.title} copied`, {
          description: getRegularTime(),
        });
        cardModal.onClose();
      },
      onError: toast.error,
    }
  );
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess(data) {
        toast.success(`Card ${data.title} deleted`, {
          description: getRegularTime(),
        });
        cardModal.onClose();
      },
      onError: toast.error,
    }
  );
  const handleCopy = () => {
    const boardId = params.boardId as string;
    executeCopyCard({
      id: data.id,
      boardId,
    });
  };
  const handleDelete = () => {
    const boardId = params.boardId as string;
    executeDeleteCard({
      id: data.id,
      listTitle: data.list.title,
      boardId,
    });
  };
  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant="gray"
        disabled={isLoadingCopy}
        className="w-full justify-start"
        size="inline"
        onClick={handleCopy}
      >
        <Copy className="size-4 mr-2" />
        Copy
      </Button>
      <Button
        variant="destructive"
        disabled={isLoadingDelete}
        className="w-full justify-start"
        size="inline"
        onClick={handleDelete}
      >
        <Trash className="size-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};
Actions.Skeleton = () => {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
Actions.Skeleton.displayName = "ActionsSkeleton";
Actions.displayName = "Actions";
export default Actions;
