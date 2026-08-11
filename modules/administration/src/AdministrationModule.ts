import { Module } from "@synerqo/core";

import { manifest } from "./manifest.js";

import {
  MenuProvider,
  RouteProvider,
} from "./Providers/index.js";

export class AdministrationModule extends Module {
  public readonly manifest = manifest;

  protected override providers() {
    return [
      MenuProvider,
      RouteProvider,
    ];
  }
}