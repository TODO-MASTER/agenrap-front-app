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
  managerOnly?: boolean
  staffOnly?: boolean
  requiredPermissions?: string[]
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
      managerOnly: true,
    },
    {
      title: "Minha Agenda",
      url: "/dashboard/me",
      icon: Clock,
      iconClass: "text-(--agenrap-purple-500)",
      staffOnly: true,
      activeFor: ["/dashboard/me"],
    },
    {
      title: "Profissionais",
      url: "/dashboard/professionals",
      icon: UsersRound,
      iconClass: "text-(--agenrap-purple-500)",
      activeFor: ["/dashboard/professionals"],
      managerOnly: true,
    },
    {
      title: "Serviços",
      url: "/dashboard/service",
      icon: HandPlatter,
      iconClass: "text-(--agenrap-purple-500)",
      activeFor: ["/dashboard/service"],
      requiredPermissions: [
        "house.service.create",
        "house.service.edit",
        "house.service.delete",
      ],
    },
    {
      title: "Clientes",
      url: "/dashboard/customers",
      icon: UsersRound,
      iconClass: "text-(--agenrap-purple-500)",
      activeFor: ["/dashboard/customers", "/dashboard/customers/new"],
      requiredPermissions: [
        "house.appointment.create",
        "house.appointment.cancel",
        "house.appointment.complete",
        "house.customer.edit",
        "house.customer.delete"
      ],
    },
    {
      title: "Jornada",
      url: "/dashboard/journey",
      icon: Clock,
      iconClass: "text-(--agenrap-purple-500)",
      requiredPermissions: [
        "house.hour.create",
        "house.hour.edit",
        "house.hour.delete",
      ],
    },
    {
      title: "Agendamentos",
      url: "/dashboard/appointments",
      icon: Calendars,
      iconClass: "text-(--agenrap-purple-500)",
      requiredPermissions: [
        "house.appointment.create",
        "house.appointment.cancel",
        "house.appointment.complete",
      ],
    },
    {
      title: "Bloqueios",
      url: "/dashboard/blocks",
      icon: CalendarClock,
      iconClass: "text-(--agenrap-purple-500)",
      activeFor: ["/dashboard/blocks"],
      requiredPermissions: [
        "house.block.create",
        "house.block.edit",
        "house.block.delete",
      ],
    },
  ],
  navMain: [],
}