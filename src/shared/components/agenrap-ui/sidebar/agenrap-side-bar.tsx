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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "../../ui/sidebar"

import { SidebarItems } from "./side-bar-items"
import Image from "next/image"
import { miniIcon } from "@/src/assets/images"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function AgenrapSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {

  const { open, isMobile,setOpenMobile } = useSidebar()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const rap = searchParams.get("rap")
  const router = useRouter()



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
        <SidebarMenu className=" gap-y-2 ">
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
                            <a href={`${item.url}?rap=${rap}`} className="flex items-center gap-2">
                              {item.icon && <item.icon className={`h-4 w-4 shrink-0 ${item.iconClass ?? ""}`} />}
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
              group.items.map((item) => {
                const isActive = item.activeFor
                  ? item.activeFor.some(r => pathname.startsWith(r))
                  : pathname === item.url
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className="flex justify-center w-full"
                    onClick={() => {
    router.push(`${item.url}?rap=${rap}`)
    if (isMobile) setOpenMobile(false)
}}
                  >
                    <button className={`rounded-md w-[60%] bg-(--agenrap-purple-500)/15 hover:bg-(--agenrap-purple-500)/25 transition-colors 
                    ${isActive ? "border-2 border-(--agenrap-purple-500)/75" : ""}
                    ${!isMobile ? "flex items-center flex-col p-2" : "flex gap-2 p-4"}`}>
                      {item.icon && <item.icon className={`h-6 w-6 shrink-0 ${item.iconClass ?? ""}`} />}
                      <p className="text-sm text-black font-tree font-medium text-center">{item.title}</p>
                    </button>
                  </SidebarMenuItem>
                )
              })
            )
          )}
        </SidebarMenu>
      </SidebarContent>

      {/* <SidebarRail /> */}
    </Sidebar>
  )
}