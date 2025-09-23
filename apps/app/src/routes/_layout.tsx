import AppSidebar from "@/components/app-sidebar";
import EmailSidebar from "@/components/email-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar collapsible="none" />
        <EmailSidebar collapsible="none" />
      </div>
      <SidebarInset>
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
