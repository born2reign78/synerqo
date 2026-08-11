export interface ModuleManifest {
  /**
   * Identifiant unique.
   */
  id: string;

  /**
   * Nom du module.
   */
  name: string;

  /**
   * Version.
   */
  version: string;

  /**
   * Description.
   */
  description: string;

  /**
   * Auteur.
   */
  author: string;

  /**
   * Version minimale du Core.
   */
  coreVersion: string;

  /**
   * Dépendances techniques.
   */
  dependencies?: {
    module: string;
    version: string;
    required: boolean;
  }[];

  /**
   * Liaisons métier.
   */
  businessLinks?: {
    module: string;
    type: string;
  }[];
}