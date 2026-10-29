
function SummaryCard({
  title,
  amount,
  icon,
  color = "emerald",
  subtitle,
}) {
  const colors = {
    emerald: {
      iconBg: "bg-emerald-100",
      iconText: "text-emerald-700",
      accent: "bg-emerald-500",
    },
    rose: {
      iconBg: "bg-rose-100",
      iconText: "text-rose-700",
      accent: "bg-rose-500",
    },
    violet: {
      iconBg: "bg-violet-100",
      iconText: "text-violet-700",
      accent: "bg-violet-500",
    },
    amber: {
      iconBg: "bg-amber-100",
      iconText: "text-amber-700",
      accent: "bg-amber-500",
    },
  };

  const selectedColor = colors[color] || colors.emerald;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6">
      {/* Decorative accent */}
      <div
        className={`absolute left-0 top-0 h-full w-1 ${selectedColor.accent}`}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 break-words text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            {amount}
          </h2>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition duration-300 group-hover:scale-110 ${selectedColor.iconBg} ${selectedColor.iconText}`}
        >
          {icon}
        </div>
      </div>

      {subtitle && (
        <p className="mt-4 text-xs leading-5 text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SummaryCard;
