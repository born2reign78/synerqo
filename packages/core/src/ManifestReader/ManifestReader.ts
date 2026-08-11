import { promises as fs } from "node:fs";
import { join } from "node:path";

import type { ModuleManifest } from "../ModuleManager/ModuleManifest.js";

import type { IManifestReader } from "./IManifestReader.js";
import { ManifestValidationError } from "./ManifestValidationError.js";

export class ManifestReader implements IManifestReader {
  public async read(path: string): Promise<ModuleManifest> {
    const file = join(path, "module.json");

    const json = await fs.readFile(file, "utf8");

    const manifest = JSON.parse(json) as ModuleManifest;

    this.validate(manifest);

    return manifest;
  }

  private validate(manifest: ModuleManifest): void {
    if (!manifest.id?.trim()) {
      throw new ManifestValidationError("Module id is required.");
    }

    if (!manifest.name?.trim()) {
      throw new ManifestValidationError("Module name is required.");
    }

    if (!manifest.version?.trim()) {
      throw new ManifestValidationError("Module version is required.");
    }

    if (!manifest.coreVersion?.trim()) {
      throw new ManifestValidationError("Core version is required.");
    }
  }
}