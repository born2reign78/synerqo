/**
 * Contrat du service de configuration.
 */
export interface IConfiguration {
  /**
   * Charge la configuration.
   */
  load(): Promise<void>;

  /**
   * Retourne une valeur de configuration.
   */
  get<T>(key: string): T;

  /**
   * Définit une valeur de configuration.
   */
  set<T>(key: string, value: T): void;

  /**
   * Vérifie si une clé existe.
   */
  has(key: string): boolean;

  /**
   * Retourne toutes les valeurs.
   */
  all(): ReadonlyMap<string, unknown>;
}