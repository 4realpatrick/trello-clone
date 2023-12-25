"use client";
// Cmp
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
// Types
interface IFoldableSeparatorProps {
  isFold: boolean;
  onToggleFold: (fold: boolean) => void;
  classNames?: string;
}
const FoldableSeparator: React.FC<IFoldableSeparatorProps> = ({
  isFold,
  onToggleFold,
  classNames = "",
}) => {
  return (
    <Separator
      orientation="vertical"
      style={{ height: "inherit" }}
      className={`relative ${classNames}`}
      children={
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="absolute top-[50%] w-6 h-6 border rounded-md flex items-center justify-center translate-x-[-50%] bg-background cursor-pointer"
                onClick={() => onToggleFold(!isFold)}
              >
                {isFold ? (
                  <DoubleArrowRightIcon className="text-primary" />
                ) : (
                  <DoubleArrowLeftIcon className="text-primary" />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent className="z-[100]">
              <p>{isFold ? "Open the sidebar" : "Close the sidebar"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    />
  );
};

export default FoldableSeparator;
