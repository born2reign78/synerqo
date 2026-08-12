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

import type { KernelStatus } from "./KernelStatus.js";

export interface IKernel {
  boot(): Promise<void>;

  shutdown(): Promise<void>;

  restart(): Promise<void>;

  isReady(): boolean;

  getStatus(): KernelStatus;

  getRegistry(): IRegistry;

  services(): IServiceContainer;

  modules(): IModuleRegistry;

  menus(): IMenuRegistry;

  routes(): IRouteRegistry;

  widgets(): IWidgetRegistry;

  dashboards(): IDashboardRegistry;

  permissions(): IPermissionRegistry;

  apis(): IApiRegistry;
}