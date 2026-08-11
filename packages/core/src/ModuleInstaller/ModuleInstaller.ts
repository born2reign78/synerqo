import type { IModuleInstaller } from "./IModuleInstaller.js";
import type { IModuleRegistry } from "../ModuleRegistry/IModuleRegistry.js";
import { ModuleInstallState } from "../ModuleRegistry/ModuleInstallState.js";
import type { ModuleInfo } from "../ModuleRegistry/ModuleInfo.js";

export class ModuleInstaller implements IModuleInstaller {
  public constructor(
    private readonly registry: IModuleRegistry
  ) {}

  public async install(id: string): Promise<void> {
    const module = this.require(id);

    module.state = ModuleInstallState.Installed;
  }

  public async uninstall(id: string): Promise<void> {
    const module = this.require(id);

    module.state = ModuleInstallState.NotInstalled;
  }

  public async enable(id: string): Promise<void> {
    const module = this.require(id);

    module.state = ModuleInstallState.Enabled;
  }

  public async disable(id: string): Promise<void> {
    const module = this.require(id);

    module.state = ModuleInstallState.Disabled;
  }

  public isInstalled(id: string): boolean {
    const module = this.require(id);

    return module.state !== ModuleInstallState.NotInstalled;
  }

  public isEnabled(id: string): boolean {
    const module = this.require(id);

    return module.state === ModuleInstallState.Enabled;
  }

  public getModules(): readonly ModuleInfo[] {
    return this.registry.getAll();
  }

  private require(id: string): ModuleInfo {
    const module = this.registry.get(id);

    if (!module) {
      throw new Error(`Module '${id}' not found.`);
    }

    return module;
  }
}