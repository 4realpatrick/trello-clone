"use client";
// Cmp
import ListHeader from "./list-header";
// Types
import { TListWithCards } from "@/types";
interface IListItemProps {
  data: TListWithCards;
  index: number;
}
const ListItem: React.FC<IListItemProps> = ({ data, index }) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md shaodw-md pb-4 bg-primary/25 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-sm border-background">
        <ListHeader data={data} />
      </div>
    </li>
  );
};

export default ListItem;
