import type { MigrationContext } from "./MigrationContext.js";

export interface IModuleMigration {
  readonly id: string;

  up(context: MigrationContext): Promise<void>;

  down(context: MigrationContext): Promise<void>;
}