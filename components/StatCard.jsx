export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-4 rounded-box border border-base-300 bg-base-100 p-5">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Icon className="h-6 w-6" /></span>
      <div>
        {value === undefined ? <div className="skeleton h-8 w-12" /> : <p className="font-heading text-4xl leading-none">{value}</p>}
        <p className="mt-1 text-sm text-base-content/65">{label}</p>
      </div>
    </div>
  );
}
