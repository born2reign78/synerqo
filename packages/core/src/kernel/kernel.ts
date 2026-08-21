import type { IConfiguration } from "../Configuration/IConfiguration.js";
import type { IRegistry } from "../Registry/IRegistry.js";
import type { IServiceContainer } from "../ServiceContainer/IServiceContainer.js";
import type { IEventBus } from "../EventBus/IEventBus.js";
import type { IModuleLoader } from "../ModuleLoader/IModuleLoader.js";
import type { IModuleManager } from "../ModuleManager/IModuleManager.js";

import type { IMenuRegistry } from "../MenuRegistry/IMenuRegistry.js";
import type { IModuleRegistry } from "../ModuleRegistry/IModuleRegistry.js";
import type { IRouteRegistry } from "../RouteRegistry/IRouteRegistry.js";
import type { IWidgetRegistry } from "../WidgetRegistry/IWidgetRegistry.js";
import type { IDashboardRegistry } from "../DashboardRegistry/IDashboardRegistry.js";
import type { IApiRegistry } from "../ApiRegistry/IApiRegistry.js";
import type { IPermissionRegistry } from "../PermissionRegistry/IPermissionRegistry.js";

import type { IKernel } from "./IKernel.js";
import { KernelStatus } from "./KernelStatus.js";

export class Kernel implements IKernel {
  private status: KernelStatus =
    KernelStatus.Stopped;

  public constructor(
    private readonly configuration: IConfiguration,
    private readonly registry: IRegistry,
    private readonly serviceContainer: IServiceContainer,
    private readonly eventBus: IEventBus,
    private readonly moduleLoader: IModuleLoader,
    private readonly moduleManager: IModuleManager
  ) {}

  /**
   * Démarre le Core.
   */
  public async boot(): Promise<void> {
    if (
      this.status !== KernelStatus.Stopped
    ) {
      return;
    }

    this.status = KernelStatus.Booting;

    await this.configuration.load();

    const modules =
      await this.moduleLoader.discover();

    console.log(
      "[KERNEL] discovered modules:",
      modules.map(
        (module) => module.manifest.id
      )
    );

    console.log(
      "[KERNEL] loading modules:",
      modules.length
    );

    await this.moduleManager.load(
      this,
      modules
    );

    console.log(
      "[KERNEL] loaded modules:",
      this.modules().getAll()
    );

    this.status = KernelStatus.Ready;
  }

  public services(): IServiceContainer {
    return this.serviceContainer;
  }

  public modules(): IModuleRegistry {
    return this.services().resolve<IModuleRegistry>(
      "ModuleRegistry"
    );
  }

  /**
   * Arrête le Core.
   */
  public async shutdown(): Promise<void> {
    if (
      this.status !== KernelStatus.Ready
    ) {
      return;
    }

    this.status = KernelStatus.Stopping;

    this.eventBus.clear();
    this.serviceContainer.clear();
    this.moduleManager.clear();

    this.status = KernelStatus.Stopped;
  }

  /**
   * Redémarre le Core.
   */
  public async restart(): Promise<void> {
    await this.shutdown();
    await this.boot();
  }

  /**
   * Le Core est-il prêt ?
   */
  public isReady(): boolean {
    return (
      this.status === KernelStatus.Ready
    );
  }

  /**
   * Etat actuel.
   */
  public getStatus(): KernelStatus {
    return this.status;
  }

  /**
   * Registry principal.
   */
  public getRegistry(): IRegistry {
    return this.registry;
  }

  /**
   * Registry des menus.
   */
  public menus(): IMenuRegistry {
    return this.registry.resolve<IMenuRegistry>(
      "menus"
    );
  }

  /**
   * Registry des routes.
   */
  public routes(): IRouteRegistry {
    return this.registry.resolve<IRouteRegistry>(
      "routes"
    );
  }

  /**
   * Registry des widgets.
   */
  public widgets(): IWidgetRegistry {
    return this.registry.resolve<IWidgetRegistry>(
      "widgets"
    );
  }

  /**
   * Registry des dashboards.
   */
  public dashboards(): IDashboardRegistry {
    return this.registry.resolve<IDashboardRegistry>(
      "dashboards"
    );
  }

  /**
   * Registry des permissions.
   */
  public permissions(): IPermissionRegistry {
    return this.registry.resolve<IPermissionRegistry>(
      "permissions"
    );
  }

  /**
   * Registry des API.
   */
  public apis(): IApiRegistry {
    return this.registry.resolve<IApiRegistry>(
      "apis"
    );
  }
}