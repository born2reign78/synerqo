import type { IModuleMigration } from "./IModuleMigration.js";
import type {
  IMigrationRepository,
} from "./IMigrationRepository.js";
import type {
  IMigrationManager,
} from "./IMigrationManager.js";
import type {
  MigrationContext,
} from "./MigrationContext.js";

export class MigrationManager
  implements IMigrationManager
{
  public constructor(
    private readonly repository: IMigrationRepository,
    private readonly context: MigrationContext
  ) {}

  public async migrate(
    moduleId: string,
    migrations: readonly IModuleMigration[]
  ): Promise<void> {
    const executed =
      await this.repository.findExecuted(
        moduleId
      );

    const executedIds = new Set(
      executed.map(
        (migration) => migration.migrationId
      )
    );

    for (const migration of migrations) {
      if (executedIds.has(migration.id)) {
        continue;
      }

      await migration.up(this.context);

      await this.repository.record(
        moduleId,
        migration.id
      );
    }
  }

  public async rollback(
    moduleId: string,
    migrations: readonly IModuleMigration[]
  ): Promise<void> {
    const executed =
      await this.repository.findExecuted(
        moduleId
      );

    const executedIds = new Set(
      executed.map(
        (migration) => migration.migrationId
      )
    );

    for (
      const migration of [...migrations].reverse()
    ) {
      if (!executedIds.has(migration.id)) {
        continue;
      }

      await migration.down(this.context);

      await this.repository.remove(
        moduleId,
        migration.id
      );
    }
  }
}