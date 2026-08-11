import type { IServiceContainer } from "./IServiceContainer.js";

export class ServiceContainer implements IServiceContainer {
  private readonly singletons = new Map<string, unknown>();

  private readonly factories = new Map<
    string,
    () => unknown
  >();

  public registerSingleton<T>(
    key: string,
    instance: T
  ): void {
    this.singletons.set(key, instance);
  }

  public registerTransient<T>(
    key: string,
    factory: () => T
  ): void {
    this.factories.set(key, factory);
  }

  public resolve<T>(key: string): T {
    if (this.singletons.has(key)) {
      return this.singletons.get(key) as T;
    }

    const factory = this.factories.get(key);

    if (factory) {
      return factory() as T;
    }

    throw new Error(
      `Service '${key}' is not registered.`
    );
  }

  public has(key: string): boolean {
    return (
      this.singletons.has(key) ||
      this.factories.has(key)
    );
  }

  public remove(key: string): void {
    this.singletons.delete(key);
    this.factories.delete(key);
  }

  public clear(): void {
    this.singletons.clear();
    this.factories.clear();
  }

  public count(): number {
    return (
      this.singletons.size +
      this.factories.size
    );
  }
}