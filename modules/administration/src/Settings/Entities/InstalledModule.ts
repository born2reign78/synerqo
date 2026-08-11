import { ModuleInstallState } from "@synerqo/core";

export interface InstalledModule {
  id: string;

  name: string;

  version: string;

  description?: string;

  author?: string;

  state: ModuleInstallState;
}