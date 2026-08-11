import { Provider, type IKernel } from "@synerqo/core";

export class MenuProvider extends Provider {
  public override async register(kernel: IKernel): Promise<void> {
    kernel.menus().register({
      id: "administration",
      module: "administration",
      title: "Administration",
      icon: "shield",
      route: "/administration",
      order: 100,
    });

    kernel.menus().register({
      id: "settings",
      module: "administration",
      parent: "administration",
      title: "Paramètres",
      icon: "settings",
      route: "/administration/settings",
      order: 1,
    });

    kernel.menus().register({
      id: "modules",
      module: "administration",
      parent: "administration",
      title: "Modules",
      icon: "package",
      route: "/administration/modules",
      order: 2,
    });
  }
}