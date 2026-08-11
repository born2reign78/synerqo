import type { IKernel } from "../Kernel/IKernel.js";
import type { IProvider } from "../Providers/IProvider.js";
import type { IModule } from "./IModule.js";
import type { ModuleManifest } from "./ModuleManifest.js";

export abstract class Module implements IModule {
  public abstract readonly manifest: ModuleManifest;

  protected abstract providers(): Array<
    new () => IProvider
  >;

  public async register(kernel: IKernel): Promise<void> {
    for (const Provider of this.providers()) {
      const provider = new Provider();

      await provider.register(kernel);
    }
  }

  public async boot(kernel: IKernel): Promise<void> {
    for (const Provider of this.providers()) {
      const provider = new Provider();

      await provider.boot(kernel);
    }
  }

  public async shutdown(kernel: IKernel): Promise<void> {
    const providers = this.providers();

    for (const Provider of [...providers].reverse()) {
      const provider = new Provider();

      await provider.shutdown(kernel);
    }
  }
}