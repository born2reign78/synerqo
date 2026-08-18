"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ModuleActionsProps {
  id: string;
  state: string;
}

export default function ModuleActions({
  id,
  state,
}: ModuleActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function install() {
    await executeAction(
      "/api/modules/install",
      "Installation du module impossible."
    );
  }

  async function enable() {
    console.log("ENABLE CLICKED", {
      id,
      state,
    });

    await executeAction(
      "/api/modules/enable",
      "Activation du module impossible."
    );
  }

  async function disable() {
    console.log("DISABLE CLICKED", {
      id,
      state,
    });

    await executeAction(
      "/api/modules/disable",
      "Désactivation du module impossible."
    );
  }

  async function executeAction(
    url: string,
    defaultError: string
  ) {
    try {
      setLoading(true);

      console.log("BEFORE FETCH", {
        url,
        id,
      });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      console.log("AFTER FETCH", {
        url,
        status: response.status,
        ok: response.ok,
      });

      const result = await response.json();

      console.log("API RESULT", result);

      if (!response.ok) {
        throw new Error(
          result.error ?? defaultError
        );
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : defaultError
      );
    } finally {
      setLoading(false);
    }
  }

  if (state === "not-installed") {
    return (
      <button
        type="button"
        onClick={install}
        disabled={loading}
      >
        {loading
          ? "Installation..."
          : "Installer"}
      </button>
    );
  }

  if (
    state === "installed" ||
    state === "disabled"
  ) {
    return (
      <button
        type="button"
        onClick={enable}
        disabled={loading}
      >
        {loading
          ? "Activation..."
          : "Activer"}
      </button>
    );
  }

  if (state === "enabled") {
    return (
      <button
        type="button"
        onClick={disable}
        disabled={loading}
      >
        {loading
          ? "Désactivation..."
          : "Désactiver"}
      </button>
    );
  }

  return null;
}