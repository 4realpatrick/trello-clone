"use client";
// Cmp
import ListHeader from "./list-header";
import CardForm from "../card/card-form";
import CardItem from "../card/card-item";
import { Draggable, Droppable } from "@hello-pangea/dnd";
// Hooks
import { useState } from "react";
// Function
import { cn } from "@/lib/utils";
// Types
import { TListWithCards } from "@/types";
interface IListItemProps {
  data: TListWithCards;
  index: number;
}
const ListItem: React.FC<IListItemProps> = ({ data, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
  };
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          className="shrink-0 h-full w-[272px] select-none"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            className="w-full rounded-md shaodw-md pb-4 bg-primary/25 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur border-background"
            {...provided.dragHandleProps}
          >
            <ListHeader data={data} onAddCard={enableEditing} />
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    data.cards.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {data.cards.map((card, index) => (
                    <CardItem index={index} key={card.id} data={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              listId={data.id}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;
