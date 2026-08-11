import type { ApiEndpoint } from "./ApiEndpoint.js";

export interface IApiRegistry {
  register(endpoint: ApiEndpoint): void;

  get(id: string): ApiEndpoint | undefined;

  getAll(): readonly ApiEndpoint[];

  has(id: string): boolean;

  remove(id: string): void;

  clear(): void;

  count(): number;
}