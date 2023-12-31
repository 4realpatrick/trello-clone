// Cmp
import { ThemeProvider } from "@/components/ui/theme-provider";
// Type
import type { Metadata } from "next";
// Style
import "./globals.css";
// Constant
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="red"
      className="light"
      style={{
        colorScheme: "light",
      }}
    >
      <body className="bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
