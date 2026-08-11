import type { InstalledModule } from "../Entities/InstalledModule.js";

export interface IModuleService {
  getAll(): Promise<readonly InstalledModule[]>;

  get(id: string): Promise<InstalledModule | undefined>;

  save(module: InstalledModule): Promise<void>;
}