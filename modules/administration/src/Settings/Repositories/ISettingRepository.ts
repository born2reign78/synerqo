import type { Setting } from "../Entities/Setting.js";

export interface ISettingRepository {
  findAll(): Promise<readonly Setting[]>;

  findByKey(key: string): Promise<Setting | undefined>;

  save(setting: Setting): Promise<void>;

  delete(key: string): Promise<void>;
}