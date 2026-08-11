import type {
  ApiEndpoint,
  Dashboard,
  Menu,
  Permission,
  Route,
  Widget
} from "@synerqo/core";

import { api } from "./api.js";
import { dashboards } from "./dashboards.js";
import { menus } from "./menus.js";
import { permissions } from "./permissions.js";
import { routes } from "./routes.js";
import { widgets } from "./widgets.js";

export interface ModuleDefinition {
  menus: readonly Menu[];
  permissions: readonly Permission[];
  routes: readonly Route[];
  widgets: readonly Widget[];
  dashboards: readonly Dashboard[];
  api: readonly ApiEndpoint[];
}

export const moduleDefinition: ModuleDefinition = {
  menus,
  permissions,
  routes,
  widgets,
  dashboards,
  api
};