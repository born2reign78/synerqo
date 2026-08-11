import type { ILifecycleManager } from "./ILifecycleManager.js";
import { ModuleState } from "./ModuleState.js";

export class LifecycleManager implements ILifecycleManager {
  private readonly states = new Map<string, ModuleState>();

  public async install(moduleId: string): Promise<void> {
    this.states.set(moduleId, ModuleState.Installed);
  }

  public async uninstall(moduleId: string): Promise<void> {
    this.states.set(moduleId, ModuleState.Uninstalled);
  }

  public async enable(moduleId: string): Promise<void> {
    this.states.set(moduleId, ModuleState.Enabled);
  }

  public async disable(moduleId: string): Promise<void> {
    this.states.set(moduleId, ModuleState.Disabled);
  }

  public getState(moduleId: string): ModuleState | undefined {
    return this.states.get(moduleId);
  }

  public has(moduleId: string): boolean {
    return this.states.has(moduleId);
  }

  public clear(): void {
    this.states.clear();
  }
}