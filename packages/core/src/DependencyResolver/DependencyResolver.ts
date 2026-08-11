import type { ModuleManifest } from "../ModuleManager/ModuleManifest.js";

import type { IDependencyResolver } from "./IDependencyResolver.js";
import { DependencyError } from "./DependencyError.js";

export class DependencyResolver implements IDependencyResolver {
  public async resolve(modules: readonly ModuleManifest[]): Promise<void> {
    const installed = new Set(modules.map(module => module.id));

    for (const module of modules) {
      if (!module.dependencies) {
        continue;
      }

      for (const dependency of module.dependencies) {
        if (dependency.required && !installed.has(dependency.module)) {
          throw new DependencyError(
            `Module "${module.id}" requires "${dependency.module}".`
          );
        }
      }
    }
  }
}