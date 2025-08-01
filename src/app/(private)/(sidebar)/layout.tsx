import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";

export const metadata = { title: "Adapta Logística" };

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="lg:flex lg:min-h-screen lg:w-full lg:overflow-hidden lg:bg-[#FAFBFD]">
        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col border-l border-l-zinc-200 bg-white transition-[padding] duration-300 lg:min-w-0 lg:pl-[--sidebar-width]">
          <Header />
          <main className="flex-1 overflow-auto p-4 lg:px-14">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
