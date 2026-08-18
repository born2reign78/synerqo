import {
  ModuleInstallState,
} from "@prisma/client";

import {
  prisma,
} from "../PrismaClient.js";

import type {
  IModuleRepository,
  ModuleRecord,
} from "./IModuleRepository.js";

export class ModuleRepository
  implements IModuleRepository
{
  public async findById(
    id: string
  ): Promise<ModuleRecord | null> {
    return prisma.module.findUnique({
      where: { id },
    });
  }

  public async findAll(): Promise<
    readonly ModuleRecord[]
  > {
    return prisma.module.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  public async create(data: {
    id: string;
    name: string;
    version: string;
    description?: string;
    author?: string;
    state?: ModuleInstallState;
  }): Promise<ModuleRecord> {
    return prisma.module.create({
      data: {
        id: data.id,
        name: data.name,
        version: data.version,
        description: data.description,
        author: data.author,
        state:
          data.state ??
          ModuleInstallState.NOT_INSTALLED,
      },
    });
  }

  public async updateState(
    id: string,
    state: ModuleInstallState
  ): Promise<ModuleRecord> {
    return prisma.module.update({
      where: { id },
      data: { state },
    });
  }
}