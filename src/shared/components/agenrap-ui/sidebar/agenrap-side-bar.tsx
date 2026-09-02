"use client"

import { ChevronRight, UserCircle } from "lucide-react"
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
  SidebarTrigger,
} from "../../ui/sidebar"
import { SidebarItems } from "./side-bar-items"
import Image from "next/image"
import { miniIcon } from "@/src/assets/images"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useProfileDialogStore } from "@/src/shared/store/use-profile-dialog.store"
import { LogoutButton } from "@/src/shared/components/agenrap-ui/button/logout-button"
import Link from "next/link"
import { FeedbackButton } from "@/src/shared/components/agenrap-ui/button/feedback-button"
import { StaffContext } from "@/src/features/business/types/professional.types"

function canSee(
  item: { managerOnly?: boolean; staffOnly?: boolean; requiredPermissions?: string[] },
  ctx: StaffContext
) {
  if (item.managerOnly) return ctx.isManager
  if (item.staffOnly) return !ctx.isManager
  if (!item.requiredPermissions) return true
  if (ctx.isManager) return true
  return item.requiredPermissions.some((code) => ctx.permissionCodes.includes(code))
}

export default function AgenrapSideBar(
  props: React.ComponentProps<typeof Sidebar> & {
    staffContext: StaffContext
    contextLoading?: boolean
  }
) {
  const { staffContext, contextLoading = false, ...sidebarProps } = props
  const { open, isMobile, setOpenMobile } = useSidebar()
  const pathname = usePathname()
  const setProfileOpen = useProfileDialogStore((s) => s.setOpen)
  const searchParams = useSearchParams()
  const rap = searchParams.get("rap")
  const router = useRouter()

  const navigate = (url: string) => {
    router.push(`${url}?rap=${rap}`)
    if (isMobile) setOpenMobile(false)
  }

  const showExpanded = open || isMobile

  const isItemActive = (item: (typeof SidebarItems.navStandalone)[0]) =>
    item.activeFor
      ? item.activeFor.some((r) => pathname.startsWith(r))
      : pathname === item.url

  const standaloneLink = (active: boolean) =>
    [
      "flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm",
      "font-tree font-medium transition-all select-none",
      active
        ? "bg-(--agenrap-purple-500)/20 text-black font-semibold"
        : "text-black/55 hover:text-black hover:bg-black/5 active:bg-(--agenrap-purple-500)/10",
    ].join(" ")

  const groupedLink = (active: boolean) =>
    [
      "flex items-center gap-3 w-full px-3 py-1.5 rounded-md text-sm",
      "font-tree font-medium transition-all select-none",
      active
        ? "bg-(--agenrap-purple-500)/20 text-black font-semibold border-l-[3px] border-(--agenrap-purple-500) pl-[calc(0.75rem-3px)]"
        : "text-black/55 hover:text-black hover:bg-black/5 active:bg-(--agenrap-purple-500)/10",
    ].join(" ")

  const flatButton = (active: boolean) =>
    [
      "rounded-md w-[60%] transition-all flex flex-col items-center p-2 gap-y-1 select-none",
      active
        ? "bg-(--agenrap-purple-500)/25 border-2 border-(--agenrap-purple-500)/60"
        : "bg-(--agenrap-purple-500)/10 hover:bg-(--agenrap-purple-500)/20 active:bg-(--agenrap-purple-500)/30 border-2 border-transparent",
    ].join(" ")

  const standaloneVisible = SidebarItems.navStandalone.filter((item) =>
    canSee(item, staffContext)
  )

  const groupsVisible = SidebarItems.navMain
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => canSee(item, staffContext)),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <Sidebar
      {...sidebarProps}
      collapsible="icon"
      className={`border-r border-r-black/20 overflow-hidden bg-(--agenrap-brown-200) ${
        contextLoading ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      <SidebarHeader className="px-0 h-20 border-b border-b-black/15 bg-(--agenrap-brown-200)">
        <div
          className={`flex h-20 w-full items-center justify-center ${
            showExpanded ? "gap-2" : "gap-0.5"
          } px-3`}
        >
          <Image
            src={miniIcon}
            alt="Agenrap logo"
            className={`transition-all duration-200 shrink-0 ${
              showExpanded ? "h-14 w-14" : "h-10 w-10"
            }`}
            priority
          />
          {showExpanded && (
            <span className="text-xl font-cinzel font-bold tracking-tight text-black truncate">
              Agenrap
            </span>
          )}
          <SidebarTrigger className="hidden lg:flex" />
        </div>
      </SidebarHeader>

      <SidebarContent
        className={`bg-(--agenrap-brown-200) overflow-x-hidden ${
          showExpanded ? "py-6" : "py-4"
        }`}
      >
        <SidebarMenu className="gap-y-0.5 px-2">
          {showExpanded ? (
            <>
              {standaloneVisible.map((item) => {
                const active = isItemActive(item)
                return (
                  <SidebarMenuItem key={item.title}>
                    <Link
                      href={`${item.url}?rap=${rap}`}
                      prefetch={true}
                      onClick={() => {
                        if (isMobile) setOpenMobile(false)
                      }}
                      className={standaloneLink(active)}
                    >
                      {item.icon && (
                        <item.icon
                          className={`h-4 w-4 shrink-0 ${
                            item.iconClass ??
                            (active
                              ? "text-(--agenrap-purple-500)"
                              : "text-black/30")
                          }`}
                        />
                      )}
                      <span className="font-tree">{item.title}</span>
                    </Link>
                  </SidebarMenuItem>
                )
              })}

              {standaloneVisible.length > 0 && groupsVisible.length > 0 && (
                <SidebarMenuItem>
                  <div className="w-full h-px bg-black/8 my-2" />
                </SidebarMenuItem>
              )}

              {groupsVisible.map((group) => (
                <Collapsible
                  key={group.title}
                  defaultOpen
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="h-6 px-3 mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-black/30 hover:text-black/50 hover:bg-transparent active:bg-transparent">
                        <span>{group.title}</span>
                        <ChevronRight className="ml-auto h-3 w-3 text-black/20 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="border-none mx-0 px-2 py-0 gap-y-0.5">
                        {group.items.map((item) => {
                          const active = isItemActive(item)
                          return (
                            <SidebarMenuSubItem key={item.title}>
                              <Link
                                href={`${item.url}?rap=${rap}`}
                                onClick={() => {
                                  if (isMobile) setOpenMobile(false)
                                }}
                                className={groupedLink(active)}
                              >
                                {item.icon && (
                                  <item.icon
                                    className={`h-4 w-4 shrink-0 ${
                                      item.iconClass ??
                                      (active
                                        ? "text-(--agenrap-purple-500)"
                                        : "text-black/30")
                                    }`}
                                  />
                                )}
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </>
          ) : (
            <>
              {standaloneVisible.map((item) => {
                const active = isItemActive(item)
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className="flex justify-center w-full"
                  >
                    <button
                      onClick={() => navigate(item.url)}
                      className={flatButton(active)}
                    >
                      {item.icon && (
                        <item.icon
                          className={`h-6 w-6 shrink-0 ${
                            item.iconClass ?? "text-(--agenrap-purple-500)"
                          }`}
                        />
                      )}
                    </button>
                  </SidebarMenuItem>
                )
              })}

              {standaloneVisible.length > 0 && groupsVisible.length > 0 && (
                <SidebarMenuItem>
                  <div className="mx-auto w-6 h-px bg-(--agenrap-purple-500) my-2" />
                </SidebarMenuItem>
              )}

              {groupsVisible.flatMap((group, groupIdx) => [
                groupIdx > 0 ? (
                  <SidebarMenuItem key={`sep-${group.title}`}>
                    <div className="mx-auto w-6 h-px bg-(--agenrap-purple-500)/15 my-2" />
                  </SidebarMenuItem>
                ) : null,
                ...group.items.map((item) => {
                  const active = isItemActive(item)
                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className="flex justify-center w-full"
                    >
                      <button
                        onClick={() => navigate(item.url)}
                        className={flatButton(active)}
                      >
                        {item.icon && (
                          <item.icon
                            className={`h-6 w-6 shrink-0 ${
                              item.iconClass ?? "text-(--agenrap-purple-500)"
                            }`}
                          />
                        )}
                      </button>
                    </SidebarMenuItem>
                  )
                }),
              ])}
            </>
          )}
        </SidebarMenu>
      </SidebarContent>

      <div className="pb-2 px-3">
        <FeedbackButton />
      </div>

      <div className="mt-auto px-3 pb-2">
        <button
          onClick={() => setProfileOpen(true)}
          className={[
            "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all select-none",
            "bg-(--agenrap-purple-500)/10 hover:bg-(--agenrap-purple-500)/20 active:bg-(--agenrap-purple-500)/25",
            !showExpanded ? "justify-center" : "",
          ].join(" ")}
        >
          <UserCircle className="h-5 w-5 shrink-0 text-(--agenrap-purple-500)" />
          {showExpanded && (
            <span className="font-tree text-sm text-black/70">Meu perfil</span>
          )}
        </button>
      </div>

      <div className="w-full relative px-3 pb-2">
        <LogoutButton showExpanded={showExpanded} />
      </div>
    </Sidebar>
  )
}