import MainLayout from "@/components/layout/MainLayout";

import {
  Bootstrap,
  type IModuleInstaller,
  ModuleInstallState,
} from "@synerqo/core";

import { CoreModule } from "@synerqo/module-core";
import { AdministrationModule } from "@synerqo/module-administration";

export default async function ModulesPage() {
  const kernel = await new Bootstrap([
    new CoreModule(),
    new AdministrationModule(),
  ]).create();

  const menus = kernel.menus().getTree();

  const installer =
    kernel
      .services()
      .resolve<IModuleInstaller>("ModuleInstaller");

  const modules = installer.getModules();

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
                ) : (
                  <button>Installer</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}