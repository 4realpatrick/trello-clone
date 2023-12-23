"use client";
import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
export default function Page() {
  const { theme: mode } = useTheme();
  return (
    <SignIn
      appearance={{
        baseTheme: mode === "dark" ? dark : undefined,
        elements: {
          footerActionLink: "text-primary hover:text-primary/70",
          formButtonPrimary: "bg-primary hover:bg-primary/70",
          socialButtonsIconButton: "hover:bg-primary/20",
        },
      }}
    />
  );
}
