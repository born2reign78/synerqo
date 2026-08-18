import type { IModuleInstaller } from "./IModuleInstaller.js";
import type { IModuleRegistry } from "../ModuleRegistry/IModuleRegistry.js";
import { ModuleInstallState } from "../ModuleRegistry/ModuleInstallState.js";
import type { ModuleInfo } from "../ModuleRegistry/ModuleInfo.js";
import type { IModuleManager } from "../ModuleManager/IModuleManager.js";
import type { IModuleRepository } from "../ModuleRepository/IModuleRepository.js";

export class ModuleInstaller implements IModuleInstaller {
  public constructor(
    private readonly registry: IModuleRegistry,
    private readonly moduleManager: IModuleManager,
    private readonly repository: IModuleRepository
  ) {}

  public async install(id: string): Promise<void> {
    const module = this.require(id);

    if (
      module.state !==
      ModuleInstallState.NotInstalled
    ) {
      return;
    }

    const state = ModuleInstallState.Installed;

    await this.repository.updateState(
      id,
      state
    );

    module.state = state;
  }

  public async uninstall(id: string): Promise<void> {
    const module = this.require(id);

    if (
      module.state ===
      ModuleInstallState.Enabled
    ) {
      throw new Error(
        `Module '${id}' must be disabled before uninstalling it.`
      );
    }

    const state =
      ModuleInstallState.NotInstalled;

    await this.repository.updateState(
      id,
      state
    );

    module.state = state;
  }

  public async enable(id: string): Promise<void> {
    const module = this.require(id);

    if (
      module.state ===
      ModuleInstallState.NotInstalled
    ) {
      throw new Error(
        `Module '${id}' must be installed before enabling it.`
      );
    }

    if (
      module.state ===
      ModuleInstallState.Enabled
    ) {
      return;
    }

    await this.moduleManager.enable(id);

    await this.repository.updateState(
      id,
      ModuleInstallState.Enabled
    );

    module.state =
      ModuleInstallState.Enabled;
  }

  public async disable(id: string): Promise<void> {
    const module = this.require(id);

    if (
      module.state !==
      ModuleInstallState.Enabled
    ) {
      return;
    }

    await this.moduleManager.disable(id);

    await this.repository.updateState(
      id,
      ModuleInstallState.Disabled
    );

    module.state =
      ModuleInstallState.Disabled;
  }

  public isInstalled(id: string): boolean {
    const module = this.require(id);

    return (
      module.state !==
      ModuleInstallState.NotInstalled
    );
  }

  public isEnabled(id: string): boolean {
    const module = this.require(id);

    return (
      module.state ===
      ModuleInstallState.Enabled
    );
  }

  public getModules(): readonly ModuleInfo[] {
    return this.registry.getAll();
  }

  private require(id: string): ModuleInfo {
    const module = this.registry.get(id);

    if (!module) {
      throw new Error(
        `Module '${id}' not found.`
      );
    }

    return module;
  }
}