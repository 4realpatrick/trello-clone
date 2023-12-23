"use client";
// Cmp
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from "../_components/sidebar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
      <ResizablePanelGroup direction="horizontal" className="flex gap-x-7">
        <ResizablePanel
          defaultSize={30}
          minSize={27}
          className="hidden md:block"
        >
          <div className="w-64 shrink-0 hidden md:block">
            <Sidebar />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="hidden md:flex" />
        <ResizablePanel defaultSize={70} minSize={40}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};

export default OrganizationLayout;
