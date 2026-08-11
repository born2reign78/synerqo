import type { Menu } from "./Menu.js";

export interface MenuTree extends Menu {
  children: MenuTree[];
}