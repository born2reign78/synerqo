import path from "node:path";

import {
  Bootstrap,
  type IKernel,
} from "@synerqo/core";

import {
  ModuleRepository,
} from "@synerqo/database";

import * as Core from "@synerqo/core";

export { Core };

let kernelPromise: Promise<IKernel> | undefined;

export function getKernel(): Promise<IKernel> {
  if (!kernelPromise) {
    const moduleRepository =
      new ModuleRepository();

    kernelPromise = new Bootstrap(
      {
        modulesPath: path.resolve(
          process.cwd(),
          "../../modules"
        ),
      },
      moduleRepository
    ).create();
  }

  return kernelPromise;
}