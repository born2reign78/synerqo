import type { IModule } from "./IModule.js";
import type { ModuleDescriptor } from "./ModuleDescriptor.js";

export interface IModuleManager {
  /**
   * Charge les modules découverts sans les activer.
   */
  load(
    kernel: import("../Kernel/IKernel.js").IKernel,
    modules: readonly ModuleDescriptor[]
  ): Promise<void>;

  /**
   * Active un module installé.
   */
  enable(id: string): Promise<void>;

  /**
   * Désactive un module actif.
   */
  disable(id: string): Promise<void>;

  /**
   * Retourne l'instance d'un module.
   */
  getModule(id: string): IModule | undefined;

  /**
   * Retourne toutes les instances chargées.
   */
  getModules(): readonly IModule[];

  /**
   * Vérifie si un module est chargé.
   */
  hasModule(id: string): boolean;

  /**
   * Supprime les modules chargés.
   */
  clear(): void;
}