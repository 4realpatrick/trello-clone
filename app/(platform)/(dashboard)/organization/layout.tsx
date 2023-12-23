"use client";
// Cmp
import Sidebar from "../_components/sidebar";
import FoldableSeparator from "./_components/foldable-separator";
// Hooks
import { useState } from "react";
// Utils
import { cn } from "@/lib/utils";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  const [isFold, setIsFold] = useState(false);
  return (
    <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
      <div className="flex gap-x-7">
        <div
          className={cn(
            "w-64 shrink-0 hidden md:block transition-[width] overflow-hidden",
            isFold && "w-0"
          )}
        >
          <Sidebar />
        </div>
        <FoldableSeparator isFold={isFold} onToggleFold={setIsFold} />
        {children}
      </div>
    </main>
  );
};

export default OrganizationLayout;
