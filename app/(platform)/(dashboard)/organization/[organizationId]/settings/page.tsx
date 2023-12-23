"use client";
import { OrganizationProfile } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const SettingPage = () => {
  const { theme: mode } = useTheme();
  return (
    <div className="w-full">
      <OrganizationProfile
        appearance={{
          baseTheme: mode === "dark" ? dark : undefined,
          elements: {
            rootBox: {
              boxShadow: "none",
              width: "100%",
            },
            card: {
              border: "1px solid hsl(var(--foreground))",
              boxShadow: "none",
            },
            membersPageInviteButton: "bg-primary hover:bg-primary/80",
            navbarButtonIcon: "text-primary",
          },
        }}
      />
    </div>
  );
};

export default SettingPage;
