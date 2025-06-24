import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";

export const metadata = { title: "Área Privada" };

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="lg:flex">
        <Sidebar />

        {/* conteúdo: já considera 16 rem (64) ou 4 rem (16) de sidebar.
            A largura real vem de CSS var no peer-selector */}
        <div className="flex min-h-screen flex-1 flex-col bg-white transition-[padding] duration-200 lg:pl-[--sidebar-width]">
          <Header />
          <main className="flex-1 p-4 lg:px-20">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
