export interface Menu {
  /**
   * Identifiant unique.
   */
  id: string;

  /**
   * Module propriétaire.
   */
  module: string;

  /**
   * Libellé.
   */
  title: string;

  /**
   * Icône.
   */
  icon?: string;

  /**
   * Route.
   */
  route: string;

  /**
   * Parent.
   */
  parent?: string;

  /**
   * Ordre d'affichage.
   */
  order: number;
}