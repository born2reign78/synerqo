import MainLayout from "@/components/layout/MainLayout";
import ModuleActions from "@/components/modules/ModuleActions";

import { ModuleInstallState } from "@synerqo/core";
import { ModuleRepository } from "@synerqo/database";

import { getKernel } from "@/lib/kernel";

export const dynamic = "force-dynamic";

export default async function ModulesPage() {
  const kernel = await getKernel();

  const menus = kernel.menus().getTree();

  const moduleRepository =
    new ModuleRepository();

  const modules =
    await moduleRepository.findAll();

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
                {module.state ===
                ModuleInstallState.Enabled
                  ? "🟢 Activé"
                  : module.state ===
                      ModuleInstallState.Installed
                    ? "🔵 Installé"
                    : module.state ===
                        ModuleInstallState.Disabled
                      ? "🟡 Désactivé"
                      : "⚪ Non installé"}
              </td>

              <td>
                <ModuleActions
                  id={module.id}
                  state={module.state}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}