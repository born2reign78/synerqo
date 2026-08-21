import type { IKernel } from "../Kernel/IKernel.js";

import type { IBootstrap } from "./IBootstrap.js";
import type { BootstrapOptions } from "./BootstrapOptions.js";

import { CoreFactory } from "../Factory/CoreFactory.js";

import type { IModuleRepository } from "../ModuleRepository/IModuleRepository.js";
import type { IModuleDatabase } from "../ModuleDatabase/IModuleDatabase.js";

export class Bootstrap
  implements IBootstrap
{
  public constructor(
    private readonly options: BootstrapOptions,
    private readonly moduleRepository: IModuleRepository,
    private readonly moduleDatabase: IModuleDatabase
  ) {}

  public async create(): Promise<IKernel> {
    const kernel =
      CoreFactory.createKernel(
        this.options,
        this.moduleRepository,
        this.moduleDatabase
      );

    await kernel.boot();

    return kernel;
  }
}