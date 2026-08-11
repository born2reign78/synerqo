export interface Widget {
  /**
   * Identifiant unique.
   */
  id: string;

  /**
   * Module propriétaire.
   */
  module: string;

  /**
   * Nom du widget.
   */
  name: string;

  /**
   * Composant React/Next.js.
   */
  component: string;

  /**
   * Emplacement.
   */
  location: string;

  /**
   * Ordre d'affichage.
   */
  order: number;
}