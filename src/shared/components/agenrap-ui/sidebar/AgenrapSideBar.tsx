"use client"

import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarHeader,
  useSidebar,
} from "../../ui/sidebar"

import { SidebarItems } from "./SidebarItems"
import Image from "next/image"
import {miniIcon} from "@/src/assets/images"

export default function AgenrapSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const { open } = useSidebar()

  return (
    <Sidebar {...props} collapsible="icon" className="border-r border-r-black">
      <SidebarHeader className="px-0  h-20 border-b border-b-black">
        <div className="flex h-20 w-full items-center justify-center gap-2">

          <Image
            src={miniIcon}
            alt="Agenrap logo"
            className={`transition-all duration-200 ${open ? "h-12.5 w-12.5" : "h-8 w-8"
              }`}
            priority
          />

          {open && (
            <span className="text-2xl  font-cinzel font-bold tracking-tight">
              Agenrap
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {SidebarItems.navMain.map((group) => (
          <Collapsible
            key={group.title}
            defaultOpen={open}
            disabled={!open}
            className="group/collapsible"
          >
            <SidebarGroup className="px-2">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex w-full items-center gap-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  {group.icon && (
                    <group.icon className="h-4 w-4 shrink-0" />
                  )}

                  <span className="group-data-[collapsible=icon]:hidden">
                    {group.title}
                  </span>

                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a
                            href={item.url}
                            className="flex items-center gap-2 pl-6 py-2"
                          >
                            {item.icon && (
                              <item.icon className="h-4 w-4 shrink-0" />
                            )}

                            <span className="group-data-[collapsible=icon]:hidden">
                              {item.title}
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}