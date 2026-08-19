export interface MigrationContext {
  execute(
    sql: string,
    params?: readonly unknown[]
  ): Promise<void>;
}