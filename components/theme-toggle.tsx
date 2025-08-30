"use client";

import * as React from "react";
import { MonitorSpeakerIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border hover:text-zinc-200 bg-white cursor-pointer dark:border-zinc-900 rounded-full"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">تغییر تم</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="divide-y *:cursor-pointer dark:bg-zinc-950 dark:border-zinc-900 bg-white"
      >
        <DropdownMenuItem
          className="hover:bg-transparent hover:text-zinc-700 hover:dark:text-zinc-200 dark:border-zinc-900"
          onClick={() => setTheme("light")}
        >
          <Sun />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-transparent hover:text-zinc-700 hover:dark:text-zinc-200 dark:border-zinc-900"
          onClick={() => setTheme("dark")}
        >
          <Moon />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-transparent hover:text-zinc-700 hover:dark:text-zinc-200 dark:border-zinc-900"
          onClick={() => setTheme("system")}
        >
          <MonitorSpeakerIcon />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
