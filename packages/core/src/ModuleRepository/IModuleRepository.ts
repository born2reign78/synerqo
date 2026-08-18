import type { ModuleRecord } from "./ModuleRecord.js";

export interface IModuleRepository {
  findById(
    id: string
  ): Promise<ModuleRecord | null>;

  findAll(): Promise<readonly ModuleRecord[]>;

  create(
    module: ModuleRecord
  ): Promise<ModuleRecord>;

  updateState(
    id: string,
    state: ModuleRecord["state"]
  ): Promise<ModuleRecord>;
}