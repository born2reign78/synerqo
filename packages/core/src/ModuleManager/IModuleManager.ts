import type { IKernel } from "../Kernel/IKernel.js";
import type { IModule } from "./IModule.js";

export interface IModuleManager {
  load(kernel: IKernel, modules: readonly IModule[]): Promise<void>;

  getModules(): readonly IModule[];

  getModule(id: string): IModule | undefined;

  hasModule(id: string): boolean;

  clear(): void;
}