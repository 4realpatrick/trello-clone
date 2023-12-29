// Cmp
import FormDialog from "@/components/form/form-dialog";
import FormPopover from "@/components/form/form-popover";
import Hint from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
// Function
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { getAvaliableCount } from "@/lib/org-limit";
// Constant
import { MAX_FREE_BOARDS } from "@/constant/boards";

const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect("/select-org");
  }
  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const avaliableCount = await getAvaliableCount();
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="size-6 mr-2" />
        Your boards
      </div>
      {boards.length === 0 ? (
        <FormDialog>
          <div className="flex h-48 md:h-64 items-center justify-center rounded-md border border-dashed text-xl hover:border-primary cursor-pointer transition hover:text-primary">
            No board here, click to create
          </div>
        </FormDialog>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {boards.map((board) => (
            <Link
              href={`/board/${board.id}`}
              key={board.id}
              style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
              className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-primary rounded-sm size-full p-2 overflow-hidden"
            >
              <div className="absolute inset-0 group-hover:bg-foreground/40 transition" />
              <p className="relative font-semibold text-white">{board.title}</p>
            </Link>
          ))}
          <FormPopover sideOffset={10} side="right">
            <div
              role="button"
              className="aspect-video relative size-full bg-muted rounded-sm flex flex-col gap-y1 items-center justify-center hover:opacity-75 transition"
            >
              <p className="text-sm">Create new board</p>
              <span className="text-xs">
                {`${MAX_FREE_BOARDS - avaliableCount} remaining`}
              </span>
              <Hint
                sideOffset={40}
                descrption={`Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace.`}
              >
                <HelpCircle className="absolute bottom-2 right-2 size-[14px]" />
              </Hint>
            </div>
          </FormPopover>
        </div>
      )}
    </div>
  );
};

export const BoardListSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video size-full p-2" />
      <Skeleton className="aspect-video size-full p-2" />{" "}
      <Skeleton className="aspect-video size-full p-2" />{" "}
      <Skeleton className="aspect-video size-full p-2" />{" "}
      <Skeleton className="aspect-video size-full p-2" />{" "}
      <Skeleton className="aspect-video size-full p-2" />{" "}
      <Skeleton className="aspect-video size-full p-2" />{" "}
      <Skeleton className="aspect-video size-full p-2" />
    </div>
  );
};

export default BoardList;
