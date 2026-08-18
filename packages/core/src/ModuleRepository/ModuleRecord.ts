import type { ModuleInstallState } from "../ModuleRegistry/ModuleInstallState.js";

export interface ModuleRecord {
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: string;
  state: ModuleInstallState;
}