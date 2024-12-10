import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export const metadata: Metadata = {
    title: "لوحة التحكم",
    description: "هنا يمكنك إدارة جميع مكالماتك...",
  };

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <SidebarTrigger className="mt-16"/>
        {children}
      </main>
    </SidebarProvider>
  )
}
