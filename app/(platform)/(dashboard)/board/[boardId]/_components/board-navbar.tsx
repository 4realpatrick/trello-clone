// Cmp
import { Board } from "@prisma/client";
import BoardTitleForm from "./board-title-form";
import BoardOptions from "./board-options";

interface IBoardNavbarProps {
  data: Board;
}

const BoardNavbar = ({ data }: IBoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] bg-background/40 fixed top-14 flex items-center gap-y-4 text-foreground pr-6">
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
};

export default BoardNavbar;
