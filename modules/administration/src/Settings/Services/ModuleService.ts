import type { InstalledModule } from "../Entities/InstalledModule.js";
import type { IModuleRepository } from "../Repositories/IModuleRepository.js";
import type { IModuleService } from "./IModuleService.js";

export class ModuleService implements IModuleService {
  public constructor(
    private readonly repository: IModuleRepository
  ) {}

  public getAll(): Promise<readonly InstalledModule[]> {
    return this.repository.getAll();
  }

  public get(id: string): Promise<InstalledModule | undefined> {
    return this.repository.get(id);
  }

  public save(module: InstalledModule): Promise<void> {
    return this.repository.save(module);
  }
}