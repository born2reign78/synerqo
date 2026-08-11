import type { IRegistry } from "./IRegistry.js";

export class Registry implements IRegistry {
  private readonly registry = new Map<string, unknown>();

  public register<T>(key: string, instance: T): void {
    const normalizedKey = key.trim();

    if (normalizedKey.length === 0) {
      throw new Error("Registry key cannot be empty.");
    }

    if (instance === undefined || instance === null) {
      throw new Error(`Registry instance "${normalizedKey}" is invalid.`);
    }

    if (this.registry.has(normalizedKey)) {
      throw new Error(`Registry key "${normalizedKey}" already exists.`);
    }

    this.registry.set(normalizedKey, instance);
  }

  public resolve<T>(key: string): T {
    const normalizedKey = key.trim();

    const instance = this.registry.get(normalizedKey);

    if (instance === undefined) {
      throw new Error(`Registry key "${normalizedKey}" not found.`);
    }

    return instance as T;
  }

  public has(key: string): boolean {
    return this.registry.has(key.trim());
  }

  public remove(key: string): void {
    this.registry.delete(key.trim());
  }

  public clear(): void {
    this.registry.clear();
  }

  public count(): number {
    return this.registry.size;
  }

  public isEmpty(): boolean {
    return this.registry.size === 0;
  }

  public keys(): string[] {
    return [...this.registry.keys()];
  }

  public values(): unknown[] {
    return [...this.registry.values()];
  }

  public entries(): ReadonlyMap<string, unknown> {
    return this.registry;
  }
}