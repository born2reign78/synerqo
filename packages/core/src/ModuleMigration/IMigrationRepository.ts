export interface MigrationRecord {
  readonly moduleId: string;
  readonly migrationId: string;
  readonly executedAt: Date;
}

export interface IMigrationRepository {
  findExecuted(
    moduleId: string
  ): Promise<readonly MigrationRecord[]>;

  record(
    moduleId: string,
    migrationId: string
  ): Promise<void>;

  remove(
    moduleId: string,
    migrationId: string
  ): Promise<void>;
}