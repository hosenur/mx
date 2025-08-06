import { Providers } from "@/components/providers";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/sidebars/app-sidebar";
import { Inter } from "next/font/google";
// import AppSidebarNav from "@/components/app-sidebar-nav"
const inter = Inter({ subsets: ["latin"] });

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <SidebarProvider className={inter.className}>
        <AppSidebar collapsible="dock" />
        <SidebarInset>
          {/*<AppSidebarNav />*/}
          <div className="p-4 lg:p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </Providers>
  );
}
