import { SidebarProvider } from "@/context/SidebarContext";

export const metadata = { title: "Área Privada" };

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="lg:flex lg:bg-[#FAFBFD]">
        <div className="flex min-h-screen flex-1 flex-col border-l border-l-zinc-200 bg-white transition-[padding] duration-300 lg:pl-[--sidebar-width]">
          <main className="flex-1 p-4 lg:px-20">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
