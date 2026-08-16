import path from "node:path";

import {
  Bootstrap,
  type IKernel,
} from "@synerqo/core";

import * as Core from "@synerqo/core";

export { Core };

let kernelPromise: Promise<IKernel> | undefined;

export function getKernel(): Promise<IKernel> {
  if (!kernelPromise) {
    kernelPromise = new Bootstrap({
      modulesPath: path.resolve(
        process.cwd(),
        "../../modules"
      ),
    }).create();
  }

  return kernelPromise;
}