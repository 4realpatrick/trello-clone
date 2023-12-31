// Cmp
import { Separator } from "@/components/ui/separator";
import Info from "./_components/info";
import BoardList, { BoardListSkeleton } from "./_components/board-list";
import { Suspense } from "react";
import { checkSubscription } from "@/lib/subscription";

const OrganizationIdPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full mb-20">
      <Info isPro={isPro} />
      <Separator className="my-4" />
      <div className="px-4 md:px-4">
        <Suspense fallback={<BoardListSkeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;
