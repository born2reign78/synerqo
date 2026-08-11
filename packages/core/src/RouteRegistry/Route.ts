export interface Route {
  /**
   * Identifiant unique.
   */
  id: string;

  /**
   * Module propriétaire.
   */
  module: string;

  /**
   * URL.
   */
  path: string;

  /**
   * Composant ou page.
   */
  component: string;

  /**
   * Méthodes HTTP autorisées.
   */
  methods?: readonly ("GET" | "POST" | "PUT" | "PATCH" | "DELETE")[];

  /**
   * Authentification requise.
   */
  authenticated: boolean;
}