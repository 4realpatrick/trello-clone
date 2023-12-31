// Cmp
import ActivityItem from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
// Utils
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ActivityList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }
  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No activity found inside this organization
      </p>
      {auditLogs.map((log) => (
        <ActivityItem data={log} key={log.id} />
      ))}
    </ol>
  );
};
ActivityList.Skeleton = () => (
  <ol>
    <Skeleton className="w-[80%] h-14" />
    <Skeleton className="w-[50%] mt-1 h-14" />
    <Skeleton className="w-[70%] mt-1 h-14" />
    <Skeleton className="w-[80%] mt-1 h-14" />
    <Skeleton className="w-[75%] mt-1 h-14" />
  </ol>
);
ActivityList.displayname = "ActivityList";
export default ActivityList;
