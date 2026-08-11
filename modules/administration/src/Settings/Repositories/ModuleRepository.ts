import type { InstalledModule } from "../Entities/InstalledModule.js";
import type { IModuleRepository } from "./IModuleRepository.js";

export class ModuleRepository implements IModuleRepository {
  private readonly modules = new Map<string, InstalledModule>();

  public async getAll(): Promise<readonly InstalledModule[]> {
    return [...this.modules.values()];
  }

  public async get(id: string): Promise<InstalledModule | undefined> {
    return this.modules.get(id);
  }

  public async save(module: InstalledModule): Promise<void> {
    this.modules.set(module.id, module);
  }
}