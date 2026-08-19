import { prisma } from "./PrismaClient.js";

import type {
  IMigrationRepository,
  MigrationRecord,
} from "@synerqo/core";

export class ModuleMigrationRepository
  implements IMigrationRepository
{
  public async findExecuted(
    moduleId: string
  ): Promise<readonly MigrationRecord[]> {
    const migrations =
      await prisma.moduleMigration.findMany({
        where: {
          moduleId,
        },
        orderBy: {
          executedAt: "asc",
        },
      });

    return migrations.map((migration) => ({
      moduleId: migration.moduleId,
      migrationId: migration.migrationId,
      executedAt: migration.executedAt,
    }));
  }

  public async record(
    moduleId: string,
    migrationId: string
  ): Promise<void> {
    await prisma.moduleMigration.upsert({
      where: {
        moduleId_migrationId: {
          moduleId,
          migrationId,
        },
      },
      update: {},
      create: {
        moduleId,
        migrationId,
      },
    });
  }

  public async remove(
    moduleId: string,
    migrationId: string
  ): Promise<void> {
    await prisma.moduleMigration.delete({
      where: {
        moduleId_migrationId: {
          moduleId,
          migrationId,
        },
      },
    });
  }
}