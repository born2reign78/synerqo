import type { IMenuRegistry } from "./IMenuRegistry.js";
import type { Menu } from "./Menu.js";
import type { MenuTree } from "./MenuTree.js";

export class MenuRegistry implements IMenuRegistry {
  private readonly menus =
    new Map<string, Menu>();

  public register(menu: Menu): void {
    if (this.menus.has(menu.id)) {
      throw new Error(
        `Menu "${menu.id}" already exists.`
      );
    }

    this.menus.set(menu.id, menu);
  }

  public get(
    id: string
  ): Menu | undefined {
    return this.menus.get(id);
  }

  public getAll(): readonly Menu[] {
    return [...this.menus.values()].sort(
      (a, b) => a.order - b.order
    );
  }

  public getTree(): readonly MenuTree[] {
    const nodes =
      new Map<string, MenuTree>();

    for (const menu of this.getAll()) {
      nodes.set(menu.id, {
        ...menu,
        children: [],
      });
    }

    const roots: MenuTree[] = [];

    for (const node of nodes.values()) {
      if (node.parent) {
        const parent =
          nodes.get(node.parent);

        if (parent) {
          parent.children.push(node);
          continue;
        }
      }

      roots.push(node);
    }

    const sortTree = (
      items: MenuTree[]
    ): void => {
      items.sort(
        (a, b) => a.order - b.order
      );

      for (const item of items) {
        sortTree(item.children);
      }
    };

    sortTree(roots);

    return roots;
  }

  public has(id: string): boolean {
    return this.menus.has(id);
  }

  public remove(id: string): void {
    this.menus.delete(id);
  }

  public removeByModule(
    moduleId: string
  ): void {
    for (const [id, menu] of this.menus) {
      if (menu.module === moduleId) {
        this.menus.delete(id);
      }
    }
  }

  public clear(): void {
    this.menus.clear();
  }

  public count(): number {
    return this.menus.size;
  }
}