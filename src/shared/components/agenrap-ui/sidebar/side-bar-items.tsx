import {
  CalendarClock,
  Calendars,
  Clock,
  HandPlatter,
  LayoutDashboard,
  UsersRound,
  FlashlightIcon,
} from "lucide-react"

export type SidebarItem = {
  title: string
  url: string
  icon: React.ElementType
  iconClass?: string
  activeFor?: string[]
}

export type SidebarGroup = {
  title: string
  icon?: React.ElementType
  items: SidebarItem[]
}

export const SidebarItems: {
  navStandalone: SidebarItem[]
  navMain: SidebarGroup[]
} = {
  navStandalone: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      iconClass: "text-(--agenrap-purple-500)",
    },
            {
          title: "Serviços",
          url: "/dashboard/service",
          icon: HandPlatter,
          iconClass: "text-(--agenrap-purple-500)",
          activeFor: ["/dashboard/service"],
        },
        {
          title: "Clientes",
          url: "/dashboard/customers",
          icon: UsersRound,
          iconClass: "text-(--agenrap-purple-500)",
          activeFor: ["/dashboard/customers", "/dashboard/customers/new"],
        },
        {
          title: "Jornada",
          url: "/dashboard/journey",
          icon: Clock,
          iconClass: "text-(--agenrap-purple-500)",
        },
        {
          title: "Agendamentos",
          url: "/dashboard/appointments",
          icon: Calendars,
          iconClass: "text-(--agenrap-purple-500)",
        },
               {
          title: "Bloqueios",
          url: "/dashboard/blocks",
          icon: CalendarClock,
          iconClass: "text-(--agenrap-purple-500)",
          activeFor: ["/dashboard/blocks"],
        },
  ],
  navMain: [
    // {
    //   title: "Outras Ferramentas",
    //   icon: FlashlightIcon,
    //   items: [

    //     {
    //       title: "Bloqueios",
    //       url: "/dashboard/blocks",
    //       icon: CalendarClock,
    //       iconClass: "text-(--agenrap-purple-500)",
    //       activeFor: ["/dashboard/blocks"],
    //     },
    //   ],
    // },
  ],
}