export type SideBarProps = {
  activeItem?: NavItem;
};

export type NavItem =
  | "dashboard"
  | "flag-explorer"
  | "applications"
  | "experiments"
  | "audit-logs"
  | "integrations"
  | "settings";

export type NavItemConfig = {
  id: NavItem;
  label: string;
  icon: string;
  href: string;
};
