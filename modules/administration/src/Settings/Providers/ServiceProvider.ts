import {
  Provider,
  type IKernel,
} from "@synerqo/core";

import { SettingRepository } from "../Repositories/SettingRepository.js";
import { SettingService } from "../Services/SettingService.js";

export class ServiceProvider extends Provider {
  public override async register(kernel: IKernel): Promise<void> {
    kernel.services().registerSingleton(
      "settings.repository",
      new SettingRepository()
    );

    kernel.services().registerTransient(
      "settings.service",
      () =>
        new SettingService(
          kernel
            .services()
            .resolve("settings.repository")
        )
    );
  }
}