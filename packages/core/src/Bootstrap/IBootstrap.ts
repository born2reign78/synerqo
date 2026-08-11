import type { IKernel } from "../Kernel/IKernel.js";

export interface IBootstrap {
  create(): Promise<IKernel>;
}