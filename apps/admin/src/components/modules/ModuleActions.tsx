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
    try {
      setLoading(true);

      const response = await fetch(
        "/api/modules/install",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Installation du module impossible."
        );
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Installation du module impossible."
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
        {loading ? "Installation..." : "Installer"}
      </button>
    );
  }

  if (state === "installed") {
    return (
      <button type="button">
        Activer
      </button>
    );
  }

  if (state === "disabled") {
    return (
      <button type="button">
        Activer
      </button>
    );
  }

  if (state === "enabled") {
    return (
      <button type="button">
        Désactiver
      </button>
    );
  }

  return null;
}