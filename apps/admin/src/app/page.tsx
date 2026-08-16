import path from "node:path";

import MainLayout from "@/components/layout/MainLayout";

import {
  Bootstrap,
  ModuleInstallState,
} from "@synerqo/core";

export default async function ModulesPage() {
  const kernel = await new Bootstrap({
    modulesPath: path.resolve(
      process.cwd(),
      "../../modules"
    ),
  }).create();

  const menus = kernel.menus().getTree();

  const modules = kernel.modules().getAll();

  return (
    <MainLayout menus={menus}>
      <h1>Gestion des modules</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 20,
        }}
      >
        <thead>
          <tr>
            <th>Nom</th>
            <th>Version</th>
            <th>État</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {modules.map((module) => (
            <tr key={module.id}>
              <td>{module.name}</td>

              <td>{module.version}</td>

              <td>
                {module.state === ModuleInstallState.Enabled
                  ? "🟢 Activé"
                  : module.state === ModuleInstallState.Disabled
                    ? "🟡 Désactivé"
                    : "⚪ Non installé"}
              </td>

              <td>
                {module.state === ModuleInstallState.Enabled ? (
                  <button>Désactiver</button>
                ) : module.state === ModuleInstallState.NotInstalled ? (
                  <button>Installer</button>
                ) : (
                  <button>Activer</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}