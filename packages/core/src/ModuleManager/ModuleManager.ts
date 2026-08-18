import { createRequire } from "node:module";

import type { IKernel } from "../Kernel/IKernel.js";
import type { IModule } from "./IModule.js";
import type { IModuleManager } from "./IModuleManager.js";
import type { ModuleDescriptor } from "./ModuleDescriptor.js";

import type { IModuleRegistry } from "../ModuleRegistry/IModuleRegistry.js";
import { ModuleInstallState } from "../ModuleRegistry/ModuleInstallState.js";

import type { IMenuRegistry } from "../MenuRegistry/IMenuRegistry.js";

import type { IModuleRepository } from "../ModuleRepository/IModuleRepository.js";

type ModuleConstructor = new () => IModule;

type LoadedModule = {
  default?: unknown;
  [key: string]: unknown;
};

const nodeRequire = createRequire(import.meta.url);

const dynamicRequire = new Function(
  "require",
  "modulePath",
  "return require(modulePath);"
) as (
  require: NodeRequire,
  modulePath: string
) => LoadedModule;

export class ModuleManager implements IModuleManager {
  private readonly modules: IModule[] = [];

  private kernel: IKernel | undefined;

  public constructor(
    private readonly repository: IModuleRepository
  ) {}

  public async load(
    kernel: IKernel,
    descriptors: readonly ModuleDescriptor[]
  ): Promise<void> {
    this.kernel = kernel;

    this.modules.length = 0;

    const moduleRegistry =
      kernel
        .services()
        .resolve<IModuleRegistry>(
          "ModuleRegistry"
        );

    moduleRegistry.clear();

    for (const descriptor of descriptors) {
      const module =
        this.instantiate(descriptor);

      this.modules.push(module);

      let stored =
        await this.repository.findById(
          module.manifest.id
        );

      if (!stored) {
        stored =
          await this.repository.create({
            id: module.manifest.id,
            name: module.manifest.name,
            version: module.manifest.version,
            description:
              module.manifest.description,
            author:
              module.manifest.author,
            state:
              ModuleInstallState.NotInstalled,
          });
      }

      moduleRegistry.register({
        id: module.manifest.id,
        name: module.manifest.name,
        version: module.manifest.version,
        description:
          module.manifest.description,
        author:
          module.manifest.author,
        state: stored.state,
      });
    }
  }

  public async enable(
    id: string
  ): Promise<void> {
    const kernel = this.requireKernel();
    const module = this.requireModule(id);

    const moduleRegistry =
      kernel
        .services()
        .resolve<IModuleRegistry>(
          "ModuleRegistry"
        );

    const moduleInfo =
      moduleRegistry.get(id);

    if (!moduleInfo) {
      throw new Error(
        `Module '${id}' is not registered.`
      );
    }

    if (
      moduleInfo.state ===
      ModuleInstallState.NotInstalled
    ) {
      throw new Error(
        `Module '${id}' must be installed before enabling it.`
      );
    }

    if (
      moduleInfo.state ===
      ModuleInstallState.Enabled
    ) {
      return;
    }

    await module.register(kernel);

    await module.boot(kernel);

    await this.repository.updateState(
      id,
      ModuleInstallState.Enabled
    );

    moduleInfo.state =
      ModuleInstallState.Enabled;
  }

  public async disable(
    id: string
  ): Promise<void> {
    const kernel = this.requireKernel();
    const module = this.requireModule(id);

    const moduleRegistry =
      kernel
        .services()
        .resolve<IModuleRegistry>(
          "ModuleRegistry"
        );

    const menuRegistry =
      kernel
        .getRegistry()
        .resolve<IMenuRegistry>(
          "menus"
        );

    const moduleInfo =
      moduleRegistry.get(id);

    if (!moduleInfo) {
      throw new Error(
        `Module '${id}' is not registered.`
      );
    }

    if (
      moduleInfo.state !==
      ModuleInstallState.Enabled
    ) {
      return;
    }

    await module.shutdown(kernel);

    menuRegistry.removeByModule(id);

    await this.repository.updateState(
      id,
      ModuleInstallState.Disabled
    );

    moduleInfo.state =
      ModuleInstallState.Disabled;
  }

  public getModule(
    id: string
  ): IModule | undefined {
    return this.modules.find(
      (module) =>
        module.manifest.id === id
    );
  }

  public getModules(): readonly IModule[] {
    return this.modules;
  }

  public hasModule(
    id: string
  ): boolean {
    return (
      this.getModule(id) !== undefined
    );
  }

  public clear(): void {
    this.modules.length = 0;
    this.kernel = undefined;
  }

  private requireKernel(): IKernel {
    if (!this.kernel) {
      throw new Error(
        "ModuleManager has not been initialized."
      );
    }

    return this.kernel;
  }

  private requireModule(
    id: string
  ): IModule {
    const module =
      this.getModule(id);

    if (!module) {
      throw new Error(
        `Module '${id}' is not loaded.`
      );
    }

    return module;
  }

  private instantiate(
    descriptor: ModuleDescriptor
  ): IModule {
    const loadedModule =
      dynamicRequire(
        nodeRequire,
        descriptor.entry
      );

    if (
      typeof loadedModule.default ===
      "function"
    ) {
      const ModuleClass =
        loadedModule.default as ModuleConstructor;

      const instance =
        new ModuleClass();

      if (this.isModule(instance)) {
        return instance;
      }
    }

    for (const exported of Object.values(
      loadedModule
    )) {
      if (
        typeof exported !==
        "function"
      ) {
        continue;
      }

      const ModuleClass =
        exported as ModuleConstructor;

      try {
        const instance =
          new ModuleClass();

        if (this.isModule(instance)) {
          return instance;
        }
      } catch {
        // Cet export n'est pas un module.
      }
    }

    throw new Error(
      `Unable to instantiate module "${descriptor.manifest.id}" ` +
        `from "${descriptor.entry}".`
    );
  }

  private isModule(
    value: unknown
  ): value is IModule {
    if (
      typeof value !== "object" ||
      value === null
    ) {
      return false;
    }

    const module =
      value as Partial<IModule>;

    return (
      typeof module.register ===
        "function" &&
      typeof module.boot ===
        "function" &&
      typeof module.shutdown ===
        "function" &&
      typeof module.manifest ===
        "object" &&
      module.manifest !== null
    );
  }
}