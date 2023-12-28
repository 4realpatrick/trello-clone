"use client";
// Cmp
import ListForm from "./list-form";
import ListItem from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
// Hooks
import { useEffect, useState } from "react";
// Function
import reorder from "@/lib/reorder";
// Types
import type { TListWithCards } from "@/types";
import type { DropResult } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import getRegularTime from "@/lib/get-regular-time";
import { updateCardOrder } from "@/actions/update-card-order";
interface IListContainerProps {
  data: TListWithCards[];
  boardId: string;
}

const ListContainer: React.FC<IListContainerProps> = ({ data, boardId }) => {
  const [orderedList, setOrderedList] = useState(data);
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onError: toast.error,
  });
  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onError: toast.error,
  });
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    // Unknown error
    if (!destination) {
      return;
    }
    // 拖拽到相同的地方
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === "list") {
      const items = reorder(orderedList, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderedList(items);
      executeUpdateListOrder({ items, boardId });
    }
    if (type === "card") {
      let newOrderedList = [...orderedList];
      const sourceList = newOrderedList.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedList.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }
      // 如果source上不存在cards
      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      // 如果destination上不存在cards
      if (!destList.cards) {
        destList.cards = [];
      }
      if (source.droppableId === destination.droppableId) {
        // 同源list中移动card
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        ).map((card, index) => ({
          ...card,
          order: index,
        }));
        sourceList.cards = reorderedCards;
        setOrderedList(newOrderedList);
        executeUpdateCardOrder({ items: reorderedCards, boardId });
      } else {
        // 非同源list中移动card
        const [moveCard] = sourceList.cards.splice(source.index, 1);
        moveCard.listId = destination.droppableId;
        destList.cards.splice(destination.index, 0, moveCard);
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        destList.cards.forEach((card, index) => {
          card.order = index;
        });
        setOrderedList(newOrderedList);
        executeUpdateCardOrder({
          items: destList.cards,
          boardId,
        });
      }
    }
  };
  useEffect(() => {
    setOrderedList(data);
  }, [data]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedList.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
