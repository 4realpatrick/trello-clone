"use client";
// Cmp
import ListForm from "./list-form";
import ListItem from "./list-item";
// Hooks
import { useEffect, useState } from "react";
// Types
import { TListWithCards } from "@/types";
interface IListContainerProps {
  data: TListWithCards[];
  boardId: string;
}

const ListContainer: React.FC<IListContainerProps> = ({ data, boardId }) => {
  const [orderedList, setOrderedList] = useState(data);
  useEffect(() => {
    setOrderedList(data);
  }, [data]);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedList.map((list, index) => (
        <ListItem key={list.id} index={index} data={list} />
      ))}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};

export default ListContainer;
