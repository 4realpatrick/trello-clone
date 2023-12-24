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
            rootBox: "shadow-none w-full",
            card: "border-[1px] border-foreground shadow-none",
            membersPageInviteButton: "bg-primary hover:bg-primary/80",
            navbarButtonIcon: "text-primary",
          },
        }}
      />
    </div>
  );
};

export default SettingPage;
