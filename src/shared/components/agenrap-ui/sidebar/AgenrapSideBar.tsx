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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "../../ui/sidebar"

import { SidebarItems } from "./SidebarItems"
import Image from "next/image"
import { miniIcon } from "@/src/assets/images"

export default function AgenrapSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {

  const { open, isMobile } = useSidebar()

  return (
    <Sidebar {...props} collapsible={"icon"} className="border-r border-r-black overflow-hidden">
      <SidebarHeader className="px-0 h-20 border-b border-b-black">
        <div className="flex h-20 w-full items-center justify-center gap-2">
          <Image
            src={miniIcon}
            alt="Agenrap logo"
            className={`transition-all duration-200 ${open ? "h-16 w-16" : "h-12 w-12"}`}
            priority
          />
          {open && (
            <span className="text-2xl font-cinzel font-bold tracking-tight">
              Agenrap
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className={`overflow-hidden ${open ? "py-8" : "py-4"}`}>
        <SidebarMenu className=" ">
          {open ? (
            SidebarItems.navMain.map((group) => (
              <Collapsible key={group.title} defaultOpen={true} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton >
                      {group.icon && <group.icon className="h-4 w-4 shrink-0" />}
                      <span>{group.title}</span>
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {group.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild >
                            <a href={item.url} className="flex items-center gap-2">
                              {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))
          ) : (
            SidebarItems.navMain.flatMap((group) =>
              group.items.map((item) => (
                <SidebarMenuItem key={item.title} className={`w-[75%] mx-auto `}       onClick={() => window.location.href = item.url}>
                  <button

              
                    className={`   rounded-md hover:bg-orange-300 transition-colors ${!isMobile?"flex  items-center   flex-col p-2 ":"flex items-center justify-center gap-2  mx-auto p-4"}`}  
                  >
                    {item.icon && <item.icon className="h-4 w-4 shrink-0" />   }              
                    <p className="text-sm text-black font-tree font-medium text-center">{item.title}</p>
                  
                  </button>

                </SidebarMenuItem>
              ))
            )
          )}
        </SidebarMenu>
      </SidebarContent>

      {/* <SidebarRail /> */}
    </Sidebar>
  )
}