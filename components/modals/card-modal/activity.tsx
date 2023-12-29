"use client";
// Cmp
import { Skeleton } from "@/components/ui/skeleton";
import ActivityItem from "@/components/activity-item";
import { ActivityIcon } from "lucide-react";
// Types
import type { AuditLog } from "@prisma/client";
interface IActivityProps {
  items: AuditLog[];
}
const Activity: React.FC<IActivityProps> & {
  Skeleton: React.FC;
} = ({ items }) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="size-5 mt-0.5 text-foreground" />
      <div className="w-full">
        <p className="font-semibold text-primary mb-2">Activity</p>
        <ol className="mt-2 space-y-4">
          {items.map((audit) => (
            <ActivityItem data={audit} key={audit.id} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Activity.Skeleton = () => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-10 bg-neutral-200" />
      </div>
    </div>
  );
};
export default Activity;
