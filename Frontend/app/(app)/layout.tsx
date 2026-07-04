import { AppProvider } from "@/lib/app-context";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppProvider>
      <div className="flex h-screen overflow-hidden bg-[#f5f5f7]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 ml-56">
          <Header />
          <main className="flex-1 overflow-y-auto overflow-x-hidden">{children}</main>
        </div>
      </div>
    </AppProvider>
  );
}
