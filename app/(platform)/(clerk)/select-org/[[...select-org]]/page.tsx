"use client";
import { OrganizationList } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const CreateOrganizationPage = () => {
  const { theme: mode } = useTheme();
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/organization/:id"
      afterCreateOrganizationUrl="/organization/:id"
      appearance={{
        baseTheme: mode === "dark" ? dark : undefined,
        elements: {
          organizationListPreviewButton: "hover:bg-primary/30",
          button: "hover:bg-primary/30",
          formButtonReset: "hover:bg-primary/30 text-primary",
          formButtonPrimary: "bg-primary hover:bg-primary/70",
          avatarImageActionsUpload: "text-primary",
        },
      }}
    />
  );
};

export default CreateOrganizationPage;
