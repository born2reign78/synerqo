import type { IModuleLoader } from "./IModuleLoader.js";
import type { IModule } from "../ModuleManager/IModule.js";

export class ModuleLoader implements IModuleLoader {
  /**
   * Découvre les modules disponibles.
   *
   * Version 1 :
   * aucun module n'est encore chargé.
   */
  public async discover(): Promise<readonly IModule[]> {
    return [];
  }
}