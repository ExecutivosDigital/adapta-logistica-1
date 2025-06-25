"use client";

import { useSidebar } from "@/context/SidebarContext";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
  const { openMobile } = useSidebar();

  return (
    <header className="flex h-16 items-center gap-2 bg-white px-4 lg:px-20">
      {/* botão só aparece < lg */}
      <button
        onClick={openMobile}
        className="lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu className="h-6 w-6" />
      </button>
      <div className="flex w-full items-center justify-between">
        <label
          className="flex w-80 items-center gap-2 rounded-md border border-zinc-200 px-2 py-1 text-zinc-400 transition duration-300"
          htmlFor="search"
        >
          <Search />
          <input
            id="search"
            className="h-full w-full border-0 bg-transparent placeholder:text-zinc-300 focus:outline-none"
            placeholder="Pesquisa"
          />
        </label>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="border-primary text-primary flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1 focus:outline-none">
                <span className="text-sm font-semibold">APROVAÇÕES</span>
                <ChevronDown />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                Lorem ipsum
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                Lorem ipsum
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                Lorem ipsum
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="flex items-center justify-center rounded-md border border-zinc-200 p-1 text-zinc-400">
            <Bell />
          </button>
          <div className="bg-primary h-8 w-8 rounded-full" />
        </div>
      </div>
      {/* ...coloque o resto dos controles do header aqui */}
    </header>
  );
}
