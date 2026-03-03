"use client";

const leftStats = [
  { label: "Sub-Agents",          value: "0" },
  { label: "Parallel Executions", value: "2" },
  { label: "Operations",          value: "1" },
];

const rightStats = [
  { label: "Critical", value: "0", color: "text-red-500"    },
  { label: "High",     value: "0", color: "text-orange-400" },
  { label: "Medium",   value: "0", color: "text-amber-400"  },
  { label: "Low",      value: "0", color: "text-lime-500"   },
];

function Dot() {
  return <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-gray-600 shrink-0 inline-block transition-colors" />;
}

export default function BottomStatusBar() {
  return (
    <div className="bg-slate-100 dark:bg-[#111827] border border-slate-300 dark:border-gray-700 mt-6 px-4 md:px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 transition-colors">

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 md:gap-20">
        {leftStats.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <Dot />
            <span className="text-[12px] sm:text-[13px] text-slate-500 dark:text-gray-400 transition-colors">
              {item.label}:{" "}
              <span className="text-slate-500 dark:text-gray-300 font-medium transition-colors">{item.value}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {rightStats.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={`text-[12px] sm:text-[13px] font-medium ${item.color}`}>
              {item.label}: {item.value}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}