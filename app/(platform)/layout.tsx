// Cmp
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const PlatFormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  );
};

export default PlatFormLayout;
