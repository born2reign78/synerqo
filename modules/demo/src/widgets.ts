import type { Widget } from "@synerqo/core";

export const widgets: Widget[] = [
  {
    id: "demo.widget",
    module: "demo",
    name: "Demo Widget",
    component: "DemoWidget",
    location: "dashboard",
    order: 1
  }
];