import type { IKernel } from "../Kernel/IKernel.js";

export interface IProvider {
  register(kernel: IKernel): Promise<void>;

  boot(kernel: IKernel): Promise<void>;

  shutdown(kernel: IKernel): Promise<void>;
}