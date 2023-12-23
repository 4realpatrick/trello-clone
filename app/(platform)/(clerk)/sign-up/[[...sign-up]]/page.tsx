"use client";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme: mode } = useTheme();
  return (
    <SignUp
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
