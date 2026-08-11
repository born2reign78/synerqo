import type { IKernel } from "../Kernel/IKernel.js";
import type { IModule } from "./IModule.js";
import type { IModuleManager } from "./IModuleManager.js";
import type { IModuleRegistry } from "../ModuleRegistry/IModuleRegistry.js";
import { ModuleInstallState } from "../ModuleRegistry/ModuleInstallState.js";

export class ModuleManager implements IModuleManager {
  private readonly modules: IModule[] = [];

  public async load(
    kernel: IKernel,
    modules: readonly IModule[]
  ): Promise<void> {
    this.modules.length = 0;

    const moduleRegistry =
      kernel
        .services()
        .resolve<IModuleRegistry>("ModuleRegistry");

    moduleRegistry.clear();

    for (const module of modules) {
      await module.register(kernel);

      this.modules.push(module);

      moduleRegistry.register({
        id: module.manifest.id,
        name: module.manifest.name,
        version: module.manifest.version,
        description: module.manifest.description,
        author: module.manifest.author,
        state: ModuleInstallState.Enabled,
      });
    }

    for (const module of this.modules) {
      await module.boot(kernel);
    }
  }

  public getModules(): readonly IModule[] {
    return this.modules;
  }

  public getModule(id: string): IModule | undefined {
    return this.modules.find(
      (module) => module.manifest.id === id
    );
  }

  public hasModule(id: string): boolean {
    return this.getModule(id) !== undefined;
  }

  public clear(): void {
    this.modules.length = 0;
  }
}