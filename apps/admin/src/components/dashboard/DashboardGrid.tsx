import { StatCard } from "./StatCard";

const stats = [
  { title: "Core Status", value: "🟢 READY" },
  { title: "Modules", value: "1" },
  { title: "Menus", value: "1" },
  { title: "Routes", value: "1" },
  { title: "Permissions", value: "1" },
  { title: "Widgets", value: "1" },
  { title: "Dashboards", value: "1" },
  { title: "API", value: "1" },
];

export function DashboardGrid() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((item) => (
        <StatCard
          key={item.title}
          title={item.title}
          value={item.value}
        />
      ))}
    </div>
  );
}