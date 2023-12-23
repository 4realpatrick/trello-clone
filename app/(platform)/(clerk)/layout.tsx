import React from "react";
import Logo from "@/components/logo";
import { ThemeController } from "@/components/theme/theme-controller";
import { ModeToggle } from "@/components/theme/mode-toggle";
const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-background flex items-center">
        <div className="flex items-center gap-x-4">
          <div className="hidden md:flex">
            <Logo />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-x-2">
          <ThemeController />
          <ModeToggle />
        </div>
      </nav>
      {children}
    </div>
  );
};

export default ClerkLayout;
