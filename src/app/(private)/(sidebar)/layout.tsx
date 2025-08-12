import { Footer } from "@/components/footer";
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
      <div className="xl:flex xl:min-h-screen xl:w-full xl:overflow-hidden xl:bg-[#FAFBFD]">
        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col border-l border-l-zinc-200 bg-white transition-[padding] duration-300 xl:min-w-0 xl:pl-[--sidebar-width]">
          <Header />
          <main className="flex-1 overflow-auto p-4 xl:px-14">{children}</main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
