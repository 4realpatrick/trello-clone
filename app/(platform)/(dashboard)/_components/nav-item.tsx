"use client";
// Cmp
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
// Hooks
import { useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";
// Utils
import { cn } from "@/lib/utils";

export type TOrganization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface INavItemProps {
  isActive: boolean;
  isExpand: boolean;
  organization: TOrganization;
  onExpand: (id: string) => void;
}
const NavItem: React.FC<INavItemProps> = ({
  isActive,
  isExpand,
  organization,
  onExpand,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        label: "Boards",
        icon: <Layout className="h-4 w-4 mr-2" />,
        href: `/organization/${organization.id}`,
      },
      {
        label: "Activity",
        icon: <Activity className="h-4 w-4 mr-2" />,
        href: `/organization/${organization.id}/activity`,
      },
      {
        label: "Settings",
        icon: <Settings className="h-4 w-4 mr-2" />,
        href: `/organization/${organization.id}/settings`,
      },
      {
        label: "Billing",
        icon: <CreditCard className="h-4 w-4 mr-2" />,
        href: `/organization/${organization.id}/billing`,
      },
    ],
    [organization.id]
  );
  const onClick = (href: string) => {
    router.push(href);
  };
  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md transition text-start no-underline hover:no-underline",
          isActive && !isExpand && "bg-primary/80 text-secondary",
          !isActive && "hover:bg-primary/50"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              src={organization.imageUrl}
              alt="Organization"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.href}
            size="sm"
            onClick={() => onClick(route.href)}
            variant="ghost"
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1",
              pathname === route.href && "bg-primary/80 hover:bg-primary/80"
            )}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export const NavItemSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
export default NavItem;
