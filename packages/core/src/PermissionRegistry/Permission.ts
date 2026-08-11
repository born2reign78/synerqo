export interface Permission {
  /**
   * Identifiant unique.
   * Exemple : gmao.workorder.create
   */
  id: string;

  /**
   * Module propriétaire.
   */
  module: string;

  /**
   * Nom de la permission.
   */
  name: string;

  /**
   * Description.
   */
  description?: string;
}