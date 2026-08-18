import { NextResponse } from "next/server";

import { getKernel } from "@/lib/kernel";
import type { IModuleInstaller } from "@synerqo/core";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const id = body?.id;

    if (typeof id !== "string" || id.length === 0) {
      return NextResponse.json(
        {
          error: "Module id is required.",
        },
        {
          status: 400,
        }
      );
    }

    const kernel = await getKernel();

    const installer =
      kernel
        .services()
        .resolve<IModuleInstaller>(
          "ModuleInstaller"
        );

    await installer.enable(id);

    return NextResponse.json({
      success: true,
      id,
    });
  } catch (error) {
    console.error(
      "Module activation failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Module activation failed.",
      },
      {
        status: 500,
      }
    );
  }
}