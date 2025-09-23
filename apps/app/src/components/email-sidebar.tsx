"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useEmails } from "@/contexts/EmailContext";
import { TextField } from "./ui/text-field";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuKeyboard,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./ui/context-menu";

export default function EmailSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const { emails } = useEmails();
  return (
    <Sidebar className="border-r" {...props}>
      <SidebarHeader>
        <TextField placeholder="Search emails" />
      </SidebarHeader>
      <SidebarContent>
        {emails?.map((email) => (
          <ContextMenu>
            <ContextMenuTrigger>
              <div key={email.id} className="p-4 flex flex-col gap-1">
                <div className="flex justify-between text-xs text-muted-fg">
                  <p>Nora Patel</p>
                  <p>8:15 AM</p>
                </div>
                <p className="text-sm">Welcome To Google</p>
                <p className="text-xs text-muted-fg">
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit.
                </p>
              </div>{" "}
            </ContextMenuTrigger>
            <ContextMenuContent className="min-w-56">
              <ContextMenuItem>Back</ContextMenuItem>
              <ContextMenuItem isDisabled>Forward</ContextMenuItem>
              <ContextMenuItem>Reload</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Bookmark</ContextMenuItem>
              <ContextMenuItem>Save as</ContextMenuItem>
              <ContextMenuItem>
                Select all
                <ContextMenuKeyboard keys="⌘A" />
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>View source</ContextMenuItem>
              <ContextMenuItem>Inspect Accessibility</ContextMenuItem>
              <ContextMenuItem>Inspect</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
