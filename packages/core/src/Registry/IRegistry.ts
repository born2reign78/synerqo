export interface IRegistry {
  register<T>(key: string, instance: T): void;

  resolve<T>(key: string): T;

  has(key: string): boolean;

  remove(key: string): void;

  clear(): void;

  count(): number;

  isEmpty(): boolean;

  keys(): string[];

  values(): unknown[];

  entries(): ReadonlyMap<string, unknown>;
}