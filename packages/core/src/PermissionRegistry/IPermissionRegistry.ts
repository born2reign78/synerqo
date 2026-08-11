import type { Permission } from "./Permission.js";

export interface IPermissionRegistry {
  register(permission: Permission): void;

  get(id: string): Permission | undefined;

  getAll(): readonly Permission[];

  has(id: string): boolean;

  remove(id: string): void;

  clear(): void;

  count(): number;
}