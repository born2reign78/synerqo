import type { Dashboard } from "./Dashboard.js";

export interface IDashboardRegistry {
  register(dashboard: Dashboard): void;

  get(id: string): Dashboard | undefined;

  getAll(): readonly Dashboard[];

  has(id: string): boolean;

  remove(id: string): void;

  clear(): void;

  count(): number;
}