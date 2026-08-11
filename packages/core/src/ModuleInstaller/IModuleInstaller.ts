import type { ModuleInfo } from "../ModuleRegistry/ModuleInfo.js";

export interface IModuleInstaller {
  install(id: string): Promise<void>;

  uninstall(id: string): Promise<void>;

  enable(id: string): Promise<void>;

  disable(id: string): Promise<void>;

  isInstalled(id: string): boolean;

  isEnabled(id: string): boolean;

  getModules(): readonly ModuleInfo[];
}