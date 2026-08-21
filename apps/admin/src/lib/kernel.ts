import path from "node:path";

import {
  Bootstrap,
  type IKernel,
} from "@synerqo/core";

import {
  ModuleRepository,
  PrismaModuleDatabase,
} from "@synerqo/database";

import * as Core from "@synerqo/core";

export { Core };

let kernelPromise:
  Promise<IKernel> | undefined;

export function getKernel(): Promise<IKernel> {
  if (!kernelPromise) {
    const moduleRepository =
      new ModuleRepository();

    const moduleDatabase =
      new PrismaModuleDatabase();

    kernelPromise = new Bootstrap(
      {
        modulesPath: path.resolve(
          process.cwd(),
          "../../modules"
        ),
      },
      moduleRepository,
      moduleDatabase
    ).create();
  }

  return kernelPromise;
}

export function resetKernel(): void {
  kernelPromise = undefined;
}