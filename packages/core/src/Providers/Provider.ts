import type { IKernel } from "../Kernel/IKernel.js";
import type { IProvider } from "./IProvider.js";

export abstract class Provider implements IProvider {
  public async register(_: IKernel): Promise<void> {}

  public async boot(_: IKernel): Promise<void> {}

  public async shutdown(_: IKernel): Promise<void> {}
}