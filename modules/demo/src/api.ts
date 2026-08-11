import type { ApiEndpoint } from "@synerqo/core";

export const api: ApiEndpoint[] = [
  {
    id: "demo.ping",
    module: "demo",
    path: "/api/demo/ping",
    method: "GET",
    handler: "ping",
    authenticated: false,
    description: "Demo endpoint"
  }
];