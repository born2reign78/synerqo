import type { IKernel } from "../Kernel/IKernel.js";
import type { IModule } from "../ModuleManager/IModule.js";

import type { IBootstrap } from "./IBootstrap.js";

import { CoreFactory } from "../Factory/CoreFactory.js";

export class Bootstrap implements IBootstrap {
  private readonly modules: IModule[];

  public constructor(modules: IModule[] = []) {
    this.modules = modules;
  }

  public async create(): Promise<IKernel> {
    const kernel = CoreFactory.createKernel();

    for (const module of this.modules) {
      await module.register(kernel);
    }

    await kernel.boot();

    for (const module of this.modules) {
      await module.boot(kernel);
    }

    return kernel;
  }
}