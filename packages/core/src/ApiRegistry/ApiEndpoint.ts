export interface ApiEndpoint {
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
   * Méthode HTTP.
   */
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

  /**
   * Handler.
   */
  handler: string;

  /**
   * Authentification requise.
   */
  authenticated: boolean;

  /**
   * Description.
   */
  description?: string;
}