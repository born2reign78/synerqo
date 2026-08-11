interface StatCardProps {
  title: string;
  value: string;
}

export function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="text-sm text-slate-500">{title}</div>

      <div className="mt-4 text-3xl font-bold">
        {value}
      </div>
    </div>
  );
}