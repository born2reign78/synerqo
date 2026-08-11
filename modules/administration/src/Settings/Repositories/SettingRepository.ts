import type { Setting } from "../Entities/Setting.js";
import type { ISettingRepository } from "./ISettingRepository.js";

export class SettingRepository implements ISettingRepository {
  private readonly items = new Map<string, Setting>();

  public async findAll(): Promise<readonly Setting[]> {
    return [...this.items.values()];
  }

  public async findByKey(
    key: string
  ): Promise<Setting | undefined> {
    return this.items.get(key);
  }

  public async save(setting: Setting): Promise<void> {
    this.items.set(setting.key, setting);
  }

  public async delete(key: string): Promise<void> {
    this.items.delete(key);
  }
}