"use client";
// Cmp
import { OrganizationSwitcher } from "@clerk/nextjs";
// Hooks
import { useTheme } from "next-themes";
// Constant
import { dark } from "@clerk/themes";

const ClientOrganizationSwitcher = () => {
  const { theme } = useTheme();
  const baseTheme = theme === "dark" ? dark : undefined;
  return (
    <OrganizationSwitcher
      hidePersonal
      afterCreateOrganizationUrl="/organization/:id"
      afterLeaveOrganizationUrl="/select-org"
      afterSelectOrganizationUrl="/organization/:id"
      appearance={{
        baseTheme,
        elements: {
          rootBox: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      }}
    />
  );
};

export default ClientOrganizationSwitcher;
