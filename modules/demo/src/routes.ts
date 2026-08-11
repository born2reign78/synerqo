import type { Route } from "@synerqo/core";

export const routes: Route[] = [
  {
    id: "demo.home",
    module: "demo",
    path: "/demo",
    component: "DemoPage",
    methods: ["GET"],
    authenticated: true
  }
];