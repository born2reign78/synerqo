import type { IKernel } from "../Kernel/IKernel.js";
import type { IProvider } from "./IProvider.js";

export class ProviderManager {
  private readonly providers: IProvider[] = [];

  public register(provider: IProvider): void {
    this.providers.push(provider);
  }

  public async boot(kernel: IKernel): Promise<void> {
    for (const provider of this.providers) {
      await provider.register(kernel);
    }

    for (const provider of this.providers) {
      await provider.boot(kernel);
    }
  }

  public async shutdown(kernel: IKernel): Promise<void> {
    for (const provider of [...this.providers].reverse()) {
      await provider.shutdown(kernel);
    }
  }

  public getProviders(): readonly IProvider[] {
    return this.providers;
  }

  public clear(): void {
    this.providers.length = 0;
  }
}