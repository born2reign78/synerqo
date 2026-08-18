import type { IKernel } from "../Kernel/IKernel.js";

import type { IBootstrap } from "./IBootstrap.js";
import type { BootstrapOptions } from "./BootstrapOptions.js";

import { CoreFactory } from "../Factory/CoreFactory.js";

import type { IModuleRepository } from "../ModuleRepository/IModuleRepository.js";

export class Bootstrap implements IBootstrap {
  public constructor(
    private readonly options: BootstrapOptions,
    private readonly moduleRepository: IModuleRepository
  ) {}

  public async create(): Promise<IKernel> {
    const kernel = CoreFactory.createKernel(
      this.options,
      this.moduleRepository
    );

    await kernel.boot();

    return kernel;
  }
}