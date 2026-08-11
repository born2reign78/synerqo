import type { ModuleInstallState } from "./ModuleInstallState.js";

export interface ModuleInfo {
  id: string;

  name: string;

  version: string;

  description?: string;

  author?: string;

  dependencies?: readonly string[];

  state: ModuleInstallState;
}