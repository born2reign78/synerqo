import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { existsSync } from "node:fs";

import type { IModuleDatabase } from "@synerqo/core";

const execFileAsync = promisify(execFile);

export class PrismaModuleDatabase
  implements IModuleDatabase
{
  public async install(
    moduleId: string
  ): Promise<void> {
    const rootPath =
      this.getProjectRoot();

    const schemaPath =
      path.join(
        rootPath,
        "modules",
        moduleId,
        "model",
        "schema.prisma"
      );

    if (!existsSync(schemaPath)) {
      throw new Error(
        `Prisma schema not found for module '${moduleId}': ${schemaPath}`
      );
    }

    const prismaCli =
      path.join(
        rootPath,
        "node_modules",
        ".pnpm",
        "prisma@6.19.3_typescript@7.0.2",
        "node_modules",
        "prisma",
        "build",
        "index.js"
      );

    if (!existsSync(prismaCli)) {
      throw new Error(
        `Prisma CLI not found: ${prismaCli}`
      );
    }

    await execFileAsync(
      process.execPath,
      [
        prismaCli,
        "db",
        "push",
        "--schema",
        schemaPath,
        "--skip-generate",
        "--accept-data-loss",
      ],
      {
        cwd: rootPath,
        env: {
          ...process.env,
        },
        windowsHide: true,
      }
    );
  }

  public async uninstall(
    _moduleId: string
  ): Promise<void> {
    /*
     * La désinstallation d'un module ne supprime
     * pas automatiquement ses données.
     */
  }

  private getProjectRoot(): string {
    return path.resolve(
      process.cwd(),
      "../.."
    );
  }
}