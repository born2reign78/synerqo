import type { IModuleRegistry } from "./IModuleRegistry.js";
import type { ModuleInfo } from "./ModuleInfo.js";

export class ModuleRegistry implements IModuleRegistry {
  private readonly modules = new Map<string, ModuleInfo>();

  public register(module: ModuleInfo): void {
    this.modules.set(module.id, module);
  }

  public get(id: string): ModuleInfo | undefined {
    return this.modules.get(id);
  }

  public getAll(): readonly ModuleInfo[] {
    return [...this.modules.values()];
  }

  public has(id: string): boolean {
    return this.modules.has(id);
  }

  public remove(id: string): void {
    this.modules.delete(id);
  }

  public clear(): void {
    this.modules.clear();
  }

  public count(): number {
    return this.modules.size;
  }
}