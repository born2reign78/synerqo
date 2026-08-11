/**
 * Options de démarrage du Core.
 */
export interface ConfigurationOptions {
  /**
   * Environnement d'exécution.
   */
  env: "development" | "test" | "production";

  /**
   * Active les logs de debug.
   */
  debug: boolean;

  /**
   * Version du Core.
   */
  version: string;
}