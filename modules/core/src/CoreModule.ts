import { Module } from "@synerqo/core";

import { manifest } from "./manifest.js";
import { MenuProvider } from "./Providers/MenuProvider.js";

export class CoreModule extends Module {
  public readonly manifest = manifest;

  protected override providers() {
    return [
      MenuProvider
    ];
  }
}