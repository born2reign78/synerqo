import type { Dashboard } from "@synerqo/core";

export const dashboards: Dashboard[] = [
  {
    id: "demo.dashboard",
    module: "demo",
    name: "demo",
    title: "Demo Dashboard",
    route: "/demo/dashboard",
    widgets: ["demo.widget"],
    order: 1
  }
];