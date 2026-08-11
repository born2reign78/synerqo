import type { Setting } from "../Entities/Setting.js";

export interface ISettingService {
  getAll(): Promise<readonly Setting[]>;

  get(key: string): Promise<Setting | undefined>;

  save(setting: Setting): Promise<void>;

  delete(key: string): Promise<void>;
}