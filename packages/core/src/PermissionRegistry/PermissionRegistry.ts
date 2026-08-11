import type { IPermissionRegistry } from "./IPermissionRegistry.js";
import type { Permission } from "./Permission.js";

export class PermissionRegistry implements IPermissionRegistry {
  private readonly permissions = new Map<string, Permission>();

  public register(permission: Permission): void {
    if (this.permissions.has(permission.id)) {
      throw new Error(`Permission "${permission.id}" already exists.`);
    }

    this.permissions.set(permission.id, permission);
  }

  public get(id: string): Permission | undefined {
    return this.permissions.get(id);
  }

  public getAll(): readonly Permission[] {
    return [...this.permissions.values()];
  }

  public has(id: string): boolean {
    return this.permissions.has(id);
  }

  public remove(id: string): void {
    this.permissions.delete(id);
  }

  public clear(): void {
    this.permissions.clear();
  }

  public count(): number {
    return this.permissions.size;
  }
}