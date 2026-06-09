import {
  Calendars,
  Clock,
  FlashlightIcon,
  HandPlatter,
  LayoutDashboard,
  UsersRound,
} from "lucide-react"

export const SidebarItems = {
  navMain: [
        {
      title: "Ações Rápidas",
      icon: FlashlightIcon
      ,
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
          iconClass: "text-(--agenrap-purple-500) ",
        },
        {
          title: "Serviços",
          url: "/dashboard/service/list",
          icon: HandPlatter,
          iconClass: "text-(--agenrap-purple-500) ",
          activeFor: ["/dashboard/service/list", "/dashboard/service/new"],
        },
                {
          title: "Clientes",
          url: "/dashboard/customers",
          icon: UsersRound,
          iconClass: "text-(--agenrap-purple-500) ",
                    activeFor: ["/dashboard/customers", "/dashboard/customers/new"],
        },
        {
          title: "Jornada",
          url: "/dashboard/journey/list",
          icon: Clock,
          iconClass: "text-(--agenrap-purple-500) ",
        },
        {
          title: "agendamentos",
          url: "/dashboard/appointments",
          icon: Calendars,
          iconClass: "text-(--agenrap-purple-500) ",
        },
      
      ],
    },
  ],
}