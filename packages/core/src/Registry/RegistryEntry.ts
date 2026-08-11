export interface RegistryEntry<T = unknown> {
  readonly key: string;

  readonly instance: T;
}