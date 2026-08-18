import type { ModuleInstallState } from "@prisma/client";

export interface ModuleRecord {
  id: string;
  name: string;
  version: string;
  description: string | null;
  author: string | null;
  state: ModuleInstallState;
  createdAt: Date;
  updatedAt: Date;
}

export interface IModuleRepository {
  findById(id: string): Promise<ModuleRecord | null>;

  findAll(): Promise<readonly ModuleRecord[]>;

  create(data: {
    id: string;
    name: string;
    version: string;
    description?: string;
    author?: string;
    state?: ModuleInstallState;
  }): Promise<ModuleRecord>;

  updateState(
    id: string,
    state: ModuleInstallState
  ): Promise<ModuleRecord>;
}