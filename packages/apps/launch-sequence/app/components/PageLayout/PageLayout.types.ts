import { ReactNode } from "react";
import { NavItem } from "../SideBar/SideBar.types";

export type PageLayoutProps = {
  children: ReactNode;
  activeNavItem?: NavItem;
};
