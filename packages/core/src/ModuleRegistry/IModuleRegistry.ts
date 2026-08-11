import type { ModuleInfo } from "./ModuleInfo.js";

export interface IModuleRegistry {
  register(module: ModuleInfo): void;

  get(id: string): ModuleInfo | undefined;

  getAll(): readonly ModuleInfo[];

  has(id: string): boolean;

  remove(id: string): void;

  clear(): void;

  count(): number;
}