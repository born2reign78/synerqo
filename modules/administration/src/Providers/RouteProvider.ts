import type { IKernel, IProvider } from "@synerqo/core";

export class RouteProvider implements IProvider {
  public async register(kernel: IKernel): Promise<void> {
    const routes = kernel.routes();

    routes.register({
      id: "administration.modules",
      path: "/modules",
      title: "Gestion des modules",
      component: "ModulesPage",
    });
  }

  public async boot(): Promise<void> {}
}