import type {
  MigrationContext,
} from "@synerqo/core";

import { prisma } from "./PrismaClient.js";

export class PrismaMigrationContext
  implements MigrationContext
{
  public async execute(
    sql: string,
    params: readonly unknown[] = []
  ): Promise<void> {
    await prisma.$executeRawUnsafe(
      sql,
      ...params
    );
  }
}