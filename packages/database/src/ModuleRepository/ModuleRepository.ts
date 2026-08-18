import {
  ModuleInstallState as PrismaModuleInstallState,
} from "@prisma/client";

import { prisma } from "../PrismaClient.js";

import type {
  IModuleRepository,
  ModuleRecord,
} from "@synerqo/core";

import {
  ModuleInstallState as CoreModuleInstallState,
} from "@synerqo/core";

export class ModuleRepository
  implements IModuleRepository
{
  public async findById(
    id: string
  ): Promise<ModuleRecord | null> {
    const module =
      await prisma.module.findUnique({
        where: { id },
      });

    if (!module) {
      return null;
    }

    return this.toRecord(module);
  }

  public async findAll(): Promise<
    readonly ModuleRecord[]
  > {
    const modules =
      await prisma.module.findMany({
        orderBy: {
          name: "asc",
        },
      });

    return modules.map((module) =>
      this.toRecord(module)
    );
  }

  public async create(
    module: ModuleRecord
  ): Promise<ModuleRecord> {
    const created =
      await prisma.module.create({
        data: {
          id: module.id,
          name: module.name,
          version: module.version,
          description:
            module.description ?? null,
          author:
            module.author ?? null,
          state: this.toPrismaState(
            module.state
          ),
        },
      });

    return this.toRecord(created);
  }

  public async updateState(
    id: string,
    state: ModuleRecord["state"]
  ): Promise<ModuleRecord> {
    const updated =
      await prisma.module.update({
        where: { id },
        data: {
          state: this.toPrismaState(state),
        },
      });

    return this.toRecord(updated);
  }

  private toRecord(module: {
    id: string;
    name: string;
    version: string;
    description: string | null;
    author: string | null;
    state: PrismaModuleInstallState;
  }): ModuleRecord {
    return {
      id: module.id,
      name: module.name,
      version: module.version,
      description:
        module.description ?? undefined,
      author:
        module.author ?? undefined,
      state: this.toCoreState(module.state),
    };
  }

  private toCoreState(
    state: PrismaModuleInstallState
  ): CoreModuleInstallState {
    switch (state) {
      case PrismaModuleInstallState.NOT_INSTALLED:
        return CoreModuleInstallState.NotInstalled;

      case PrismaModuleInstallState.INSTALLED:
        return CoreModuleInstallState.Installed;

      case PrismaModuleInstallState.ENABLED:
        return CoreModuleInstallState.Enabled;

      case PrismaModuleInstallState.DISABLED:
        return CoreModuleInstallState.Disabled;

      default:
        throw new Error(
          `Unknown Prisma module state: ${state}`
        );
    }
  }

  private toPrismaState(
    state: CoreModuleInstallState
  ): PrismaModuleInstallState {
    switch (state) {
      case CoreModuleInstallState.NotInstalled:
        return PrismaModuleInstallState.NOT_INSTALLED;

      case CoreModuleInstallState.Installed:
        return PrismaModuleInstallState.INSTALLED;

      case CoreModuleInstallState.Enabled:
        return PrismaModuleInstallState.ENABLED;

      case CoreModuleInstallState.Disabled:
        return PrismaModuleInstallState.DISABLED;

      default:
        throw new Error(
          `Unknown Core module state: ${state}`
        );
    }
  }
}