import { ElementType } from "react";

export default interface SidebarItem {
  title: string;
  href?: string;
  icon: ElementType;
  action?: "logout";
}
