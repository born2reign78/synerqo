import {
  Provider,
  type IKernel,
} from "@synerqo/core";

export class MenuProvider extends Provider {
  public override async register(kernel: IKernel): Promise<void> {
    kernel.menus().register({
      id: "dashboard",
      module: "core",
      title: "Dashboard",
      icon: "dashboard",
      route: "/",
      order: 1,
    });
  }
}