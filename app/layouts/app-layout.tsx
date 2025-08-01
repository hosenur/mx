import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import AppSidebar from "~/components/app-sidebar";
import AppSidebarNav from "~/components/app-sidebar-nav";
import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/app-layout";
import { auth } from "~/lib/auth";
export async function loader({ params, request }: Route.LoaderArgs) {
  const data = await auth.api.getSession({ headers: request.headers });
  if (!data) {
    return redirect("/auth/login");
  }
  return {
    user: data.user,
  };
}
export default function Layout({ loaderData }: Route.ComponentProps) {
  return (
    <SidebarProvider>
      <AppSidebar collapsible="dock" intent="inset" user={loaderData.user} />
      <SidebarInset>
        <AppSidebarNav />
        <div className="p-4 lg:p-6 ">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
