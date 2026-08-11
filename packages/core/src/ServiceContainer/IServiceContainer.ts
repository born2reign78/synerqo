export interface IServiceContainer {
  registerSingleton<T>(key: string, instance: T): void;

  registerTransient<T>(
    key: string,
    factory: () => T
  ): void;

  resolve<T>(key: string): T;

  has(key: string): boolean;

  remove(key: string): void;

  clear(): void;

  count(): number;
}