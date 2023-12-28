"use client";
// Cmp
import { Draggable } from "@hello-pangea/dnd";
// Utils
import { cn } from "@/lib/utils";
// Hooks
import { useCardModal } from "@/hooks/use-card-modal";
// Types
import { Card } from "@prisma/client";
interface ICardItemProps {
  index: number;
  data: Card;
}
const CardItem: React.FC<ICardItemProps> = ({ index, data }) => {
  const cardModal = useCardModal();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className={cn(
            "truncate border-2 border-transparent hover:border-foreground py-2 px-3 text-sm bg-background rounded shadow-sm",
            snapshot.isDragging && "bg-primary"
          )}
          onClick={() => cardModal.onOpen(data.id)}
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
