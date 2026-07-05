import { AppProvider } from "@/lib/app-context";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import type { ReactNode } from "react";

export default function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <AppProvider>
      <div className="flex h-screen overflow-hidden bg-surface">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AppProvider>
  );
}
