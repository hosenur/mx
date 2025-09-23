"use client";

import {
  IconBoltFill,
  IconBrandIntentui, IconChevronsY, IconCreditCardFill, IconDashboardFill, IconEnvelopeFill, IconHeadphonesFill, IconLogout, IconSettingsFill,
  IconShieldFill,
  IconShoppingBagFill
} from "@intentui/icons";
import { Avatar } from "@/components/ui/avatar";
import { Link } from "@/components/ui/link";
import {
  Menu,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel, SidebarRail,
  SidebarSection,
  SidebarSectionGroup
} from "@/components/ui/sidebar";

export default function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  return (
    <Sidebar className="border-r w-48" {...props}>
      <SidebarHeader>
        <Link
          href="/docs/components/layouts/sidebar"
          className="flex items-center gap-x-2"
        >
          <IconBrandIntentui className="size-8" />
          <SidebarLabel className="font-medium">
            Intent <span className="text-muted-fg">UI</span>
          </SidebarLabel>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSectionGroup>
          <SidebarSection label="Overview">
            <SidebarItem tooltip="Overview" href="#">
              <IconEnvelopeFill />
              <SidebarLabel>Primary</SidebarLabel>
            </SidebarItem>

            <SidebarItem href="#" badge="4" tooltip="Payments">
              <IconCreditCardFill />
              <SidebarLabel>Banking</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="#" tooltip="Payments">
              <IconBoltFill />
              <SidebarLabel>Tech</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="#"  tooltip="Payments">
              <IconShoppingBagFill />
              <SidebarLabel>Promotions</SidebarLabel>
            </SidebarItem>
          </SidebarSection>
        </SidebarSectionGroup>
      </SidebarContent>

      <SidebarFooter className="flex flex-row justify-between gap-4 group-data-[state=collapsed]:flex-col">
        <Menu>
          <MenuTrigger
            className="flex w-full items-center justify-between"
            aria-label="Profile"
          >
            <div className="flex items-center gap-x-2">
              <Avatar
                className="size-8 *:size-8 group-data-[state=collapsed]:size-6 group-data-[state=collapsed]:*:size-6"
                isSquare
                src="https://intentui.com/images/avatar/cobain.jpg"
              />

              <div className="in-data-[collapsible=dock]:hidden text-sm">
                <SidebarLabel>Kurt Cobain</SidebarLabel>
                <span className="-mt-0.5 block text-muted-fg">
                  kurt@domain.com
                </span>
              </div>
            </div>
            <IconChevronsY data-slot="chevron" />
          </MenuTrigger>
          <MenuContent
            className="in-data-[sidebar-collapsible=collapsed]:min-w-56 min-w-(--trigger-width)"
            placement="bottom right"
          >
            <MenuSection>
              <MenuHeader separator>
                <span className="block">Kurt Cobain</span>
                <span className="font-normal text-muted-fg">@cobain</span>
              </MenuHeader>
            </MenuSection>

            <MenuItem href="#dashboard">
              <IconDashboardFill />
              Dashboard
            </MenuItem>
            <MenuItem href="#settings">
              <IconSettingsFill />
              Settings
            </MenuItem>
            <MenuItem href="#security">
              <IconShieldFill />
              Security
            </MenuItem>
            <MenuSeparator />

            <MenuItem href="#contact">
              <IconHeadphonesFill />
              Customer Support
            </MenuItem>
            <MenuSeparator />
            <MenuItem href="#logout">
              <IconLogout />
              Log out
            </MenuItem>
          </MenuContent>
        </Menu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
