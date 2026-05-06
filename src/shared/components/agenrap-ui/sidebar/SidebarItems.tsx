import {
  Clock,
  FlashlightIcon,
  HandPlatter,
  LayoutDashboard,
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
          title: "Jornada",
          url: "/dashboard/journey/list",
          icon: Clock,
          iconClass: "text-(--agenrap-purple-500) ",
        },
      
      ],
    },

    //      {
    //   title: "Acesso a coisas",
    //   icon: Rocket,
    //   url: "#",
    //   items: [
    //     {
    //       title: "Coisas legais",
    //       url: "#",
    //       icon: Download,
    //     },
    //     {
    //       title: "investigar",
    //       url: "#",
    //       icon: FolderTree,
    //     },
    //   ],
    // },


  ],
}