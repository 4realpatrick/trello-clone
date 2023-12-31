"use client";
// Cmp
import { CreditCard } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
// Hooks
import { useOrganization } from "@clerk/nextjs";
// Utils
import { cn } from "@/lib/utils";

interface IInfoProps {
  isPro: boolean;
}

const Info: React.FC<IInfoProps> = ({ isPro }) => {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) {
    return <InfoSkeleton />;
  }
  return (
    <div className="flex items-center gap-x-4">
      <div className="size-[60px] relative">
        <Image
          priority
          fill
          src={organization?.imageUrl!}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="Organization"
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">{organization?.name}</p>
        <div
          className={cn(
            "flex items-center text-xs text-background w-fit px-2 py-0.5 rounded-sm",
            isPro ? "bg-green-500" : " bg-gray-400"
          )}
        >
          <CreditCard className="size-3 mr-1" />
          {isPro ? "Pro" : "Free"}
        </div>
      </div>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="flex items-center gap-x-4">
      <div className="size-[60px] relative">
        <Skeleton className="size-full absolute" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center">
          <Skeleton className="size-4 mr-2" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};
export default Info;
