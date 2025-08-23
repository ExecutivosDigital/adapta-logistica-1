"use client";

import { useBranch } from "@/context/BranchContext";
import { useSidebar } from "@/context/SidebarContext";
import { useValueContext } from "@/context/ValueContext";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { Bell, ChevronDown, Eye, EyeOff, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
  const { openMobile } = useSidebar();
  const { branches, selectedBranch, setSelectedBranch } = useBranch();
  const { viewAllValues, setViewAllValues } = useValueContext();

  return (
    <header className="flex h-16 items-center gap-2 bg-white px-4 xl:px-20">
      {/* botão só aparece < lg */}
      <button
        onClick={openMobile}
        className="xl:hidden"
        aria-label="Abrir menu"
      >
        <Menu className="h-6 w-6" />
      </button>
      <div className="flex w-full items-center justify-between">
        <div></div>
        {/* <label
          className="flex w-80 items-center gap-2 rounded-md border border-zinc-200 px-2 py-1 text-zinc-400 transition duration-300"
          htmlFor="search"
        >
          <Search />
          <input
            id="search"
            className="h-full w-full border-0 bg-transparent placeholder:text-zinc-300 focus:outline-none"
            placeholder="Pesquisa"
          />
        </label> */}
        <div className="flex items-center gap-2">
          <div
            onClick={() => setViewAllValues(!viewAllValues)}
            className="hover:text-primary hover:border-primary flex cursor-pointer items-center justify-center rounded-md border border-zinc-200 p-1 text-zinc-400 transition duration-150"
          >
            {viewAllValues ? <EyeOff /> : <Eye />}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="hover:border-primary-dark flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 p-1 transition duration-300">
                <span className="text-primary w-40 truncate font-semibold xl:w-60">
                  {selectedBranch?.name}
                </span>
                <ChevronDown className="text-zinc-400" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] divide-y divide-zinc-200">
              <DropdownMenuArrow />
              {branches.map((branch) => (
                <DropdownMenuItem
                  key={branch.id}
                  className="hover:bg-primary/20 mt-2 mb-2 flex cursor-pointer flex-col items-start gap-2 text-start transition duration-300 xl:flex-row"
                  onClick={() => setSelectedBranch(branch)}
                >
                  <span>{branch.name}</span>
                  <span>CNPJ:{branch.cnpj}</span>
                </DropdownMenuItem>
              ))}
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
