import type { Menu } from "./Menu.js";
import type { MenuTree } from "./MenuTree.js";

export interface IMenuRegistry {
  register(menu: Menu): void;

  get(id: string): Menu | undefined;

  getAll(): readonly Menu[];

  getTree(): readonly MenuTree[];

  has(id: string): boolean;

  remove(id: string): void;

  removeByModule(moduleId: string): void;

  clear(): void;

  count(): number;
}