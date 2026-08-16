import type { ModuleDescriptor } from "../ModuleManager/ModuleDescriptor.js";

export interface IModuleLoader {
  /**
   * Découvre les modules disponibles.
   */
  discover(): Promise<readonly ModuleDescriptor[]>;
}