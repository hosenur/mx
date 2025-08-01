import {
  IconChevronsY,
  IconDashboardFill,
  IconHeadphonesFill,
  IconInboxFill,
  IconLogout,
  IconSendFill,
  IconSettingsFill,
  IconShieldFill,
} from "@intentui/icons";
import { Avatar } from "~/components/ui/avatar";
import { Link } from "~/components/ui/link";
import { Menu } from "~/components/ui/menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarRail,
  SidebarSection,
  SidebarSectionGroup,
} from "~/components/ui/sidebar";
export default function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>,
) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link
          className="flex items-center gap-x-2 group-data-[collapsible=dock]:size-10 group-data-[collapsible=dock]:justify-center"
          href="/docs/components/layouts/sidebar"
        >
          <img src="/logo.svg" className="w-6" alt="" />
          <SidebarLabel className="font-medium">
            hosenur<span className="text-muted-fg"> / mx</span>
          </SidebarLabel>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSectionGroup>
          <SidebarSection label="Overview">
            <SidebarItem tooltip="Overview" href="#">
              <IconInboxFill />
              <SidebarLabel>Inbox</SidebarLabel>
            </SidebarItem>
            <SidebarItem tooltip="Overview" href="#">
              <IconSendFill />
              <SidebarLabel>Sent</SidebarLabel>
            </SidebarItem>
          </SidebarSection>
        </SidebarSectionGroup>
      </SidebarContent>

      <SidebarFooter>
        <Menu>
          <Menu.Trigger className="group" aria-label="Profile">
            <Avatar
              isSquare
              src="https://intentui.com/images/avatar/cobain.jpg"
            />
            <div className="in-data-[sidebar-collapsible=dock]:hidden text-sm">
              <SidebarLabel>{props.user.name}</SidebarLabel>
              <span className="-mt-0.5 block text-muted-fg">
                {props.user.email}
              </span>
            </div>
            <IconChevronsY data-slot="chevron" />
          </Menu.Trigger>
          <Menu.Content
            className="in-data-[sidebar-collapsible=collapsed]:min-w-56 min-w-(--trigger-width)"
            placement="bottom right"
          >
            <Menu.Section>
              <Menu.Header separator>
                <span className="block">Kurt Cobain</span>
                <span className="font-normal text-muted-fg">@cobain</span>
              </Menu.Header>
            </Menu.Section>

            <Menu.Item href="#dashboard">
              <IconDashboardFill />
              Dashboard
            </Menu.Item>
            <Menu.Item href="#settings">
              <IconSettingsFill />
              Settings
            </Menu.Item>
            <Menu.Item href="#security">
              <IconShieldFill />
              Security
            </Menu.Item>
            <Menu.Separator />

            <Menu.Item href="#contact">
              <IconHeadphonesFill />
              Customer Support
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item href="#logout">
              <IconLogout />
              Log out
            </Menu.Item>
          </Menu.Content>
        </Menu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
