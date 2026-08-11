import type { ModuleManifest } from "../ModuleManager/ModuleManifest.js";

export interface IManifestReader {
  read(path: string): Promise<ModuleManifest>;
}