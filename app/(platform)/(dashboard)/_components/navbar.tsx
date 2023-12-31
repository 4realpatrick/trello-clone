// Cmp
import Logo from "@/components/logo";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import ClientOrganizationSwitcher from "./client-organization-switcher";
import { ThemeController } from "@/components/theme/theme-controller";
import MobileSidebar from "./mobile-sidebar";
import FormPopover from "@/components/form/form-popover";
import { Skeleton } from "@/components/ui/skeleton";

const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-background flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            size="sm"
            className="rounded-sm hidden md:block h-auto py-1.5 px-2"
          >
            Create
          </Button>
        </FormPopover>
        <FormPopover>
          <Button size="sm" className="rounded-sm block md:hidden">
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <ThemeController />
        <ModeToggle />
        <ClerkLoading>
          <Skeleton className="w-44 h-10" />
        </ClerkLoading>
        <ClerkLoaded>
          <ClientOrganizationSwitcher />
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: {
                  height: 30,
                  width: 30,
                },
              },
            }}
          />
        </ClerkLoaded>
      </div>
    </nav>
  );
};

export default Navbar;
