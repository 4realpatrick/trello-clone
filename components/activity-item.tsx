// Cmp
import { Avatar, AvatarImage } from "./ui/avatar";
// Utils
import { generateLogMessage } from "@/lib/generate-log-message";
import getRegularTime from "@/lib/get-regular-time";
// Types
import type { AuditLog } from "@prisma/client";
interface IActivityItemProps {
  data: AuditLog;
}
const ActivityItem: React.FC<IActivityItemProps> = ({ data }) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="size-8">
        <AvatarImage src={data.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-primary mr-2">
            {data.userName}
          </span>
          {generateLogMessage(data)}
        </p>
        <p className=" text-xs text-muted-foreground">
          {getRegularTime(data.createdAt)}
        </p>
      </div>
    </li>
  );
};

export default ActivityItem;
