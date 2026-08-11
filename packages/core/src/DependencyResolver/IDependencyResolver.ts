import type { ModuleManifest } from "../ModuleManager/ModuleManifest.js";

export interface IDependencyResolver {
  resolve(modules: readonly ModuleManifest[]): Promise<void>;
}