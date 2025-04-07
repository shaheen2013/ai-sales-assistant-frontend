interface SidebarItem {
  label: string;
  href: string;
  icon: string;
}

interface SidebarSection {
  label: string;
  items: SidebarItem[];
}

export const dashboardSidebar: SidebarSection[] = [
  {
    label: "Menu",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard/overview",
        icon: "home",
      },
      {
        label: "Dealer Overview",
        href: "/dashboard/settings",
        icon: "settings",
      },
      {
        label: "Team Management",
        href: "/dashboard/settings",
        icon: "settings",
      },
    ],
  },

  {
    label: "Insights",
    items: [
      {
        label: "Notifications",
        href: "/dashboard/overview",
        icon: "home",
      },
      {
        label: "Support",
        href: "/dashboard/settings",
        icon: "settings",
      },
      {
        label: "Forums",
        href: "/dashboard/settings",
        icon: "settings",
      },
    ],
  },

  {
    label: "Tools",
    items: [
      {
        label: "Settings",
        href: "/dashboard/overview",
        icon: "home",
      },
      {
        label: "logout",
        href: "/dashboard/settings",
        icon: "settings",
      },
    ],
  },
];
