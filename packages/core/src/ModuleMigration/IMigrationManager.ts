import type { IModuleMigration } from "./IModuleMigration.js";

export interface IMigrationManager {
  migrate(
    moduleId: string,
    migrations: readonly IModuleMigration[]
  ): Promise<void>;

  rollback(
    moduleId: string,
    migrations: readonly IModuleMigration[]
  ): Promise<void>;
}