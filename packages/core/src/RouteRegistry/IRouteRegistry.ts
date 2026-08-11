import type { Route } from "./Route.js";

export interface IRouteRegistry {
  register(route: Route): void;

  get(id: string): Route | undefined;

  getAll(): readonly Route[];

  has(id: string): boolean;

  remove(id: string): void;

  clear(): void;

  count(): number;
}