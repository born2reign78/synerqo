export interface Dashboard {
  /**
   * Identifiant unique.
   */
  id: string;

  /**
   * Module propriétaire.
   */
  module: string;

  /**
   * Nom du dashboard.
   */
  name: string;

  /**
   * Titre affiché.
   */
  title: string;

  /**
   * Route d'accès.
   */
  route: string;

  /**
   * Widgets utilisés.
   */
  widgets: readonly string[];

  /**
   * Ordre d'affichage.
   */
  order: number;
}