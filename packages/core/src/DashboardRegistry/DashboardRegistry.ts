import type { IDashboardRegistry } from "./IDashboardRegistry.js";
import type { Dashboard } from "./Dashboard.js";

export class DashboardRegistry implements IDashboardRegistry {
  private readonly dashboards = new Map<string, Dashboard>();

  public register(dashboard: Dashboard): void {
    if (this.dashboards.has(dashboard.id)) {
      throw new Error(`Dashboard "${dashboard.id}" already exists.`);
    }

    this.dashboards.set(dashboard.id, dashboard);
  }

  public get(id: string): Dashboard | undefined {
    return this.dashboards.get(id);
  }

  public getAll(): readonly Dashboard[] {
    return [...this.dashboards.values()];
  }

  public has(id: string): boolean {
    return this.dashboards.has(id);
  }

  public remove(id: string): void {
    this.dashboards.delete(id);
  }

  public clear(): void {
    this.dashboards.clear();
  }

  public count(): number {
    return this.dashboards.size;
  }
}
