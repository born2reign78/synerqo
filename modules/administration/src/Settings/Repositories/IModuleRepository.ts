import type { InstalledModule } from "../Entities/InstalledModule.js";

export interface IModuleRepository {
  getAll(): Promise<readonly InstalledModule[]>;

  get(id: string): Promise<InstalledModule | undefined>;

  save(module: InstalledModule): Promise<void>;
}