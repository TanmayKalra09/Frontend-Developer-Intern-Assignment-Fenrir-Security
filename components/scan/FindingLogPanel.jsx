"use client";

const severityConfig = {
  Critical: { bg: "bg-red-500",    text: "text-white" },
  High:     { bg: "bg-orange-500", text: "text-white" },
  Medium:   { bg: "bg-amber-400",  text: "text-white" },
  Low:      { bg: "bg-blue-400",   text: "text-white" },
};

export const defaultFindings = [
  {
    severity: "Critical",
    time: "10:45:23",
    title: "SQL Injection in Authentication Endpoint",
    endpoint: "/api/users/profile",
    description:
      "Time-based blind SQL injection confirmed.",
  },
  {
    severity: "High",
    time: "10:45:23",
    title: "Unauthorized Access to User Metadata",
    endpoint: "/api/auth/login",
    description:
      "Authenticated low-privilege user was.",
  },
];

function FindingCard({ finding }) {
  const sev = severityConfig[finding.severity] ?? { bg: "bg-slate-400", text: "text-white" };

  return (
    <div className="border border-slate-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-[#161A20] hover:shadow-sm transition-colors transition-shadow">
      <div className="flex items-center justify-between mb-2.5">
        <span
          className={`${sev.bg} ${sev.text} text-xs font-semibold rounded-full px-3 py-0.5 leading-5`}
        >
          {finding.severity}
        </span>
        <span className="text-xs text-slate-400 tabular-nums">{finding.time}</span>
      </div>

      <h3 className="font-bold text-[14px] text-slate-900 dark:text-gray-100 mb-1 leading-snug transition-colors">
        {finding.title}
      </h3>

      <p className="text-[13px] text-teal-500 dark:text-teal-400 font-mono mb-2 transition-colors">{finding.endpoint}</p>

      <p className="text-[13px] text-slate-500 dark:text-gray-400 leading-relaxed transition-colors">{finding.description}</p>
    </div>
  );
}

export default function FindingLogPanel({ findings = defaultFindings }) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-black transition-colors">
      <div className="px-5 py-[11.5px] border-b border-slate-200 dark:border-gray-700 shrink-0 transition-colors">
        <h2 className="font-semibold text-[15px] text-slate-900 dark:text-gray-100 transition-colors">Finding Log</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {findings.map((finding, i) => (
          <FindingCard key={i} finding={finding} />
        ))}
      </div>
    </div>
  );
}