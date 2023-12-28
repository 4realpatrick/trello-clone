"use client";
// Types
import { Card } from "@prisma/client";
interface ICardItemProps {
  index: number;
  data: Card;
}
const CardItem: React.FC<ICardItemProps> = ({ index, data }) => {
  return (
    <div className="truncate border-2 border-transparent hover:border-foreground py-2 px-3 text-sm bg-background rounded shadow-sm">
      {data.title}
    </div>
  );
};

export default CardItem;
