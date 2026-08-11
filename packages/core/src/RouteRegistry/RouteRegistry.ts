import type { IRouteRegistry } from "./IRouteRegistry.js";
import type { Route } from "./Route.js";

export class RouteRegistry implements IRouteRegistry {
  private readonly routes = new Map<string, Route>();

  public register(route: Route): void {
    if (this.routes.has(route.id)) {
      throw new Error(`Route "${route.id}" already exists.`);
    }

    this.routes.set(route.id, route);
  }

  public get(id: string): Route | undefined {
    return this.routes.get(id);
  }

  public getAll(): readonly Route[] {
    return [...this.routes.values()];
  }

  public has(id: string): boolean {
    return this.routes.has(id);
  }

  public remove(id: string): void {
    this.routes.delete(id);
  }

  public clear(): void {
    this.routes.clear();
  }

  public count(): number {
    return this.routes.size;
  }
}