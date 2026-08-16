import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import type { IModuleLoader } from "./IModuleLoader.js";
import type { ModuleDescriptor } from "../ModuleManager/ModuleDescriptor.js";
import type { ModuleManifest } from "../ModuleManager/ModuleManifest.js";

import { ModuleSource } from "./ModuleSource.js";

type PackageJson = {
  main?: string;
};

type ModuleExports = {
  manifest?: ModuleManifest;
  default?: unknown;
  [key: string]: unknown;
};

export class ModuleLoader implements IModuleLoader {
  public constructor(
    private readonly modulesPath: string
  ) {}

  /**
   * Importe dynamiquement un module sans permettre
   * à Turbopack de tenter de résoudre le chemin
   * au moment du build.
   */
  private async dynamicImport(
    modulePath: string
  ): Promise<ModuleExports> {
    const moduleUrl =
      pathToFileURL(modulePath).href;

    const importer = new Function(
      "moduleUrl",
      "return import(moduleUrl);"
    ) as (
      moduleUrl: string
    ) => Promise<ModuleExports>;

    return importer(moduleUrl);
  }

  /**
   * Découvre automatiquement les modules présents
   * dans le dossier des modules.
   *
   * Chaque module doit être un package contenant :
   *
   * modules/
   *   mon-module/
   *     package.json
   *     dist/
   *       index.js
   */
  public async discover(): Promise<
    readonly ModuleDescriptor[]
  > {
    const modulesPath = path.resolve(
      this.modulesPath
    );

    if (!existsSync(modulesPath)) {
      return [];
    }

    const entries = await readdir(modulesPath, {
      withFileTypes: true,
    });

    const descriptors: ModuleDescriptor[] = [];

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const modulePath = path.join(
        modulesPath,
        entry.name
      );

      const packageJsonPath = path.join(
        modulePath,
        "package.json"
      );

      if (!existsSync(packageJsonPath)) {
        continue;
      }

      const packageJsonContent =
        await readFile(
          packageJsonPath,
          "utf-8"
        );

      const packageJson =
        JSON.parse(
          packageJsonContent
        ) as PackageJson;

      const main =
        typeof packageJson.main === "string"
          ? packageJson.main
          : "./dist/index.js";

      const entryPath = path.resolve(
        modulePath,
        main
      );

      if (!existsSync(entryPath)) {
        continue;
      }

      const loadedModule =
        await this.dynamicImport(entryPath);

      const manifest =
        loadedModule.manifest;

      if (!manifest) {
        continue;
      }

      descriptors.push({
        source: ModuleSource.FileSystem,
        path: modulePath,
        entry: entryPath,
        manifest,
      });
    }

    return descriptors;
  }
}