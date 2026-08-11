import { Configuration } from "../Configuration/Configuration.js";
import { Registry } from "../Registry/Registry.js";
import { ServiceContainer } from "../ServiceContainer/ServiceContainer.js";
import { EventBus } from "../EventBus/EventBus.js";
import { ModuleLoader } from "../ModuleLoader/ModuleLoader.js";
import { ModuleManager } from "../ModuleManager/ModuleManager.js";
import { ModuleRegistry } from "../ModuleRegistry/ModuleRegistry.js";
import { ModuleInstaller } from "../ModuleInstaller/ModuleInstaller.js";
import { Kernel } from "../Kernel/Kernel.js";

import { MenuRegistry } from "../MenuRegistry/MenuRegistry.js";
import { RouteRegistry } from "../RouteRegistry/RouteRegistry.js";
import { WidgetRegistry } from "../WidgetRegistry/WidgetRegistry.js";
import { DashboardRegistry } from "../DashboardRegistry/DashboardRegistry.js";
import { PermissionRegistry } from "../PermissionRegistry/PermissionRegistry.js";
import { ApiRegistry } from "../ApiRegistry/ApiRegistry.js";

import type { IKernel } from "../Kernel/IKernel.js";

export class CoreFactory {
  public static createKernel(): IKernel {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------

    const configuration = new Configuration({
      env: "development",
      debug: true,
      version: "1.0.0",
    });

    // -------------------------------------------------------------------------
    // Registry principal
    // -------------------------------------------------------------------------

    const registry = new Registry();

    // -------------------------------------------------------------------------
    // Registries spécialisés
    // -------------------------------------------------------------------------

    registry.register("menus", new MenuRegistry());

    registry.register("routes", new RouteRegistry());

    registry.register("widgets", new WidgetRegistry());

    registry.register("dashboards", new DashboardRegistry());

    registry.register("permissions", new PermissionRegistry());

    registry.register("apis", new ApiRegistry());

    // -------------------------------------------------------------------------
    // Services
    // -------------------------------------------------------------------------

    const serviceContainer = new ServiceContainer();

    const moduleRegistry = new ModuleRegistry();

    const moduleInstaller = new ModuleInstaller(moduleRegistry);

    serviceContainer.registerSingleton(
      "ModuleRegistry",
      moduleRegistry
    );

    serviceContainer.registerSingleton(
      "ModuleInstaller",
      moduleInstaller
    );

    const eventBus = new EventBus();

    const moduleLoader = new ModuleLoader();

    const moduleManager = new ModuleManager();

    // -------------------------------------------------------------------------
    // Kernel
    // -------------------------------------------------------------------------

    return new Kernel(
      configuration,
      registry,
      serviceContainer,
      eventBus,
      moduleLoader,
      moduleManager
    );
  }
}