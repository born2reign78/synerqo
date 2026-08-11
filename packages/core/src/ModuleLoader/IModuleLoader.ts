import type { IModule } from "../ModuleManager/IModule.js";

export interface IModuleLoader {
  /**
   * Découvre les modules disponibles.
   */
  discover(): Promise<readonly IModule[]>;
}