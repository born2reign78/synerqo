import { ModuleState } from "./ModuleState.js";

export interface ILifecycleManager {
  install(moduleId: string): Promise<void>;

  uninstall(moduleId: string): Promise<void>;

  enable(moduleId: string): Promise<void>;

  disable(moduleId: string): Promise<void>;

  getState(moduleId: string): ModuleState | undefined;

  has(moduleId: string): boolean;

  clear(): void;
}