import type { Setting } from "../Entities/Setting.js";
import type { ISettingRepository } from "../Repositories/ISettingRepository.js";
import type { ISettingService } from "./ISettingService.js";

export class SettingService implements ISettingService {
  public constructor(
    private readonly repository: ISettingRepository
  ) {}

  public getAll(): Promise<readonly Setting[]> {
    return this.repository.findAll();
  }

  public get(
    key: string
  ): Promise<Setting | undefined> {
    return this.repository.findByKey(key);
  }

  public save(setting: Setting): Promise<void> {
    return this.repository.save(setting);
  }

  public delete(key: string): Promise<void> {
    return this.repository.delete(key);
  }
}