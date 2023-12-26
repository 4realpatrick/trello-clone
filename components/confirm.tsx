// Cmp
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { AlertTriangle, Loader2, Info, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
// Types
interface IConfirmProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  confirmEle: JSX.Element;
  type?: "error" | "warn" | "success" | "info" | "loading";
}

const getIcon = (type: IConfirmProps["type"]) => {
  const cmpMapping = {
    error: {
      ele: AlertTriangle,
      variant: "text-rose-500",
    },
    warn: {
      ele: AlertTriangle,
      variant: "text-yellow-500",
    },
    success: {
      ele: CheckCircle2,
      variant: "text-green-500",
    },
    info: {
      ele: Info,
      variant: "text-blue-500",
    },
    loading: {
      ele: Loader2,
      variant: "text-primary animate-spin",
    },
  };
  const Cmp = cmpMapping[type!]["ele"];
  return <Cmp className={cn("size-6 mr-2", cmpMapping[type!]["variant"])} />;
};

const Confirm: React.FC<IConfirmProps> = ({
  children,
  title,
  description,
  confirmEle,
  type = "error",
}) => {
  const icon = getIcon(type);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center">
            {icon}
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>{confirmEle}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Confirm;
