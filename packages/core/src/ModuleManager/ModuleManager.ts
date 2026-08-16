import { createRequire } from "node:module";

import type { IKernel } from "../Kernel/IKernel.js";
import type { IModule } from "./IModule.js";
import type { IModuleManager } from "./IModuleManager.js";
import type { ModuleDescriptor } from "./ModuleDescriptor.js";

import type { IModuleRegistry } from "../ModuleRegistry/IModuleRegistry.js";
import { ModuleInstallState } from "../ModuleRegistry/ModuleInstallState.js";

type ModuleConstructor = new () => IModule;

type LoadedModule = {
  default?: unknown;
  manifest?: unknown;
  [key: string]: unknown;
};

const nodeRequire = createRequire(import.meta.url);

/**
 * Appel de require dynamique exécuté uniquement
 * au runtime Node.js.
 *
 * Turbopack ne doit pas analyser le chemin.
 */
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

  public async load(
    kernel: IKernel,
    descriptors: readonly ModuleDescriptor[]
  ): Promise<void> {
    this.modules.length = 0;

    const moduleRegistry =
      kernel
        .services()
        .resolve<IModuleRegistry>("ModuleRegistry");

    moduleRegistry.clear();

    for (const descriptor of descriptors) {
      const module = this.instantiate(descriptor);

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

  /**
   * Instancie un module découvert par le ModuleLoader.
   */
  private instantiate(
    descriptor: ModuleDescriptor
  ): IModule {
    const loadedModule = dynamicRequire(
      nodeRequire,
      descriptor.entry
    );

    /*
     * Priorité à l'export default.
     */
    if (
      typeof loadedModule.default === "function"
    ) {
      const ModuleClass =
        loadedModule.default as ModuleConstructor;

      const instance = new ModuleClass();

      if (this.isModule(instance)) {
        return instance;
      }
    }

    /*
     * Recherche parmi les exports nommés.
     */
    for (const exported of Object.values(
      loadedModule
    )) {
      if (typeof exported !== "function") {
        continue;
      }

      const ModuleClass =
        exported as ModuleConstructor;

      try {
        const instance = new ModuleClass();

        if (this.isModule(instance)) {
          return instance;
        }
      } catch {
        /*
         * Cet export n'est pas une classe de module
         * instanciable sans argument.
         */
      }
    }

    throw new Error(
      `Unable to instantiate module "${descriptor.manifest.id}" ` +
        `from "${descriptor.entry}".`
    );
  }

  /**
   * Vérifie qu'une instance respecte le contrat IModule.
   */
  private isModule(
    value: unknown
  ): value is IModule {
    if (
      typeof value !== "object" ||
      value === null
    ) {
      return false;
    }

    const module = value as Partial<IModule>;

    return (
      typeof module.register === "function" &&
      typeof module.boot === "function" &&
      typeof module.shutdown === "function" &&
      typeof module.manifest === "object" &&
      module.manifest !== null
    );
  }

  public getModules(): readonly IModule[] {
    return this.modules;
  }

  public getModule(
    id: string
  ): IModule | undefined {
    return this.modules.find(
      (module) => module.manifest.id === id
    );
  }

  public hasModule(
    id: string
  ): boolean {
    return this.getModule(id) !== undefined;
  }

  public clear(): void {
    this.modules.length = 0;
  }
}