"use client";
import { Footer } from "@/components/footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/utils/cn";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="xl:flex xl:min-h-screen xl:bg-[#FAFBFD]">
      <Sidebar />

      <div
        className={cn(
          "flex min-h-screen flex-1 flex-col border-l border-l-zinc-200 bg-white transition-[padding] duration-300 xl:min-w-0",
          isCollapsed ? "xl:pl-16" : "xl:pl-64",
        )}
      >
        <Header />
        <main className="flex-1 overflow-auto p-4 xl:px-14">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
