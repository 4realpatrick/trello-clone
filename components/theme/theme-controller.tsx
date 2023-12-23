"use client";
// Cmp
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Constant
import {
  TASKIFY_THEME_KEY,
  THEME_ARRAY,
  TTheme,
  getThemeFromLocal,
} from "@/constant/theme";
import { ColorWheelIcon } from "@radix-ui/react-icons";

// Hooks
import { useEffect, useState } from "react";

export function ThemeController() {
  const [curTheme, setCurTheme] = useState<TTheme>(getThemeFromLocal());

  useEffect(() => {
    try {
      if (localStorage && document) {
        localStorage.setItem(TASKIFY_THEME_KEY, curTheme);
        document.documentElement.setAttribute("data-theme", curTheme);
      }
    } catch (error) {
      console.error("error found in theme.controller.tsx:", error);
    }
  }, [curTheme]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="md:hidden">
          <ColorWheelIcon className="text-primary w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-30">
          <DropdownMenuRadioGroup
            value={curTheme}
            onValueChange={(val: string) => setCurTheme(val as TTheme)}
          >
            {THEME_ARRAY.map((theme) => (
              <DropdownMenuRadioItem
                value={theme}
                className="justify-between"
                key={theme}
              >
                <span>
                  {theme.slice(0, 1).toUpperCase() +
                    theme.slice(1).toLowerCase()}
                </span>
                <div
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[${theme}] hover:bg-primary/80 rotate-90 justify-end`}
                ></div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="hidden md:block">
          <Button>Theme</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-30">
          <DropdownMenuRadioGroup
            value={curTheme}
            onValueChange={(val: string) => setCurTheme(val as TTheme)}
          >
            {THEME_ARRAY.map((theme) => (
              <DropdownMenuRadioItem
                value={theme}
                className="justify-between"
                key={theme}
              >
                <span>
                  {theme.slice(0, 1).toUpperCase() +
                    theme.slice(1).toLowerCase()}
                </span>
                <div
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[${theme}] hover:bg-primary/80 rotate-90 justify-end`}
                ></div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
