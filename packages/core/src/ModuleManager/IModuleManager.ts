import type { IKernel } from "../Kernel/IKernel.js";
import type { IModule } from "./IModule.js";
import type { ModuleDescriptor } from "./ModuleDescriptor.js";

export interface IModuleManager {
  load(
    kernel: IKernel,
    modules: readonly ModuleDescriptor[]
  ): Promise<void>;

  getModules(): readonly IModule[];

  getModule(id: string): IModule | undefined;

  hasModule(id: string): boolean;

  clear(): void;
}