import type { IApiRegistry } from "./IApiRegistry.js";
import type { ApiEndpoint } from "./ApiEndpoint.js";

export class ApiRegistry implements IApiRegistry {
  private readonly endpoints = new Map<string, ApiEndpoint>();

  public register(endpoint: ApiEndpoint): void {
    if (this.endpoints.has(endpoint.id)) {
      throw new Error(`API "${endpoint.id}" already exists.`);
    }

    this.endpoints.set(endpoint.id, endpoint);
  }

  public get(id: string): ApiEndpoint | undefined {
    return this.endpoints.get(id);
  }

  public getAll(): readonly ApiEndpoint[] {
    return [...this.endpoints.values()];
  }

  public has(id: string): boolean {
    return this.endpoints.has(id);
  }

  public remove(id: string): void {
    this.endpoints.delete(id);
  }

  public clear(): void {
    this.endpoints.clear();
  }

  public count(): number {
    return this.endpoints.size;
  }
}