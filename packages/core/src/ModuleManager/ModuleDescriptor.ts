import type { ModuleManifest } from "./ModuleManifest.js";
import type { ModuleSource } from "../ModuleLoader/ModuleSource.js";

export interface ModuleDescriptor {
  /**
   * Origine du module.
   */
  source: ModuleSource;

  /**
   * Emplacement physique du module.
   */
  path: string;

  /**
   * Point d'entrée du module.
   */
  entry: string;

  /**
   * Manifest du module.
   */
  manifest: ModuleManifest;
}