"use client";

import { useSidebar } from "@/context/SidebarContext";
import { Menu } from "lucide-react";

export default function Header() {
  const { openMobile } = useSidebar();

  return (
    <header className="flex h-16 items-center gap-2 border-b bg-white px-4 lg:px-6">
      {/* botão só aparece < lg */}
      <button
        onClick={openMobile}
        className="lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <h1 className="text-lg font-semibold">Bem-vindo, Geovane</h1>
      {/* ...coloque o resto dos controles do header aqui */}
    </header>
  );
}
