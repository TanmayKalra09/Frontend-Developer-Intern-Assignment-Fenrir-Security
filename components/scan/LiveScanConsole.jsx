"use client";
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import FindingLogPanel from "./FindingLogPanel";

const activityLogEntries = [
  "[09:00:00] I'll begin a systematic penetration test on helpdesk.democorp.com. Let me start with reconnaissance and enumeration.",
  "[09:01:00] Good! Target is online. Performing port scanning to identify running services.",
  "[09:02:00] Excellent reconnaissance results: Apache httpd 2.4.65 detected on port 80.",
  "[09:03:00] Found a login page. Testing account detected: test:test.",
  "[09:04:00] POST method not allowed. Trying alternative approach.",
  "[09:05:00] Exploring additional endpoints using discovered credentials.",
  "[09:06:00] Dashboard accessible via X-UserId header manipulation. Potential IDOR vulnerability detected."
];

function Part({ part }) {
  switch (part.type) {
    case "link":
      return (
        <span className="text-teal-400 cursor-pointer hover:underline">
          {part.content}
        </span>
      );
    case "code-teal":
      return (
        <span className="text-teal-400 font-mono">{part.content}</span>
      );
    case "pill":
      return (
        <span className="inline-block bg-slate-800 text-slate-200 rounded px-2 py-0.5 text-[0.82em] font-mono mx-0.5 align-middle">
          {part.content}
        </span>
      );
    case "highlight-cyan":
      return (
        <span className="bg-cyan-100 text-cyan-700 rounded px-1 font-mono">
          {part.content}
        </span>
      );
    case "bold-red":
      return (
        <span className="text-red-500 font-bold">
          {part.content}
        </span>
      );
    default:
      return <span>{part.content}</span>;
  }
}

export default function LiveScanConsole() {
  const [activeTab, setActiveTab] = useState("activity");
  const [minimized, setMinimized] = useState(false);

  return (
    <div className="flex flex-col w-full mt-[-10px] bg-white dark:bg-black border border-slate-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm transition-colors">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 dark:bg-[#161A20] px-4 md:px-5 py-3.5 border-b border-slate-200 dark:border-gray-700 shrink-0 transition-colors">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
          </span>

          <span className="font-semibold text-[15px] text-slate-900 dark:text-gray-100 tracking-tight transition-colors">
            Live Scan Console
          </span>

          <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#1F2937] border border-slate-200 dark:border-gray-600 rounded-full px-3 py-0.5 text-[12px] text-slate-500 dark:text-gray-300 select-none transition-colors">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-slate-400">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Running...
          </span>
        </div>

      <div className="flex items-center gap-3 text-slate-400">
        <button
          onClick={() => setMinimized(!minimized)}
          className="hover:text-slate-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Minimise"
        >
          <ChevronDown
            size={16}
            strokeWidth={2}
            className={`transition-transform ${minimized ? "rotate-180" : "rotate-0"}`}
          />
        </button>
          <button className="hover:text-slate-600 dark:hover:text-gray-200 transition-colors" aria-label="Close">
            <X size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {!minimized && (
        <div className="flex flex-col md:flex-row flex-1 min-h-0 md:h-[680px]">

        <div className="flex flex-col w-full md:flex-[0_0_62%] border-b md:border-b-0 md:border-r border-slate-200 dark:border-gray-700 min-w-0 transition-colors">

          <div className="flex shrink-0 border-b border-slate-200 dark:border-gray-700 px-5 transition-colors">
            {[
              { key: "activity",     label: "Activity Log" },
              { key: "verification", label: "Verification Loops" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={[
                  "text-sm py-3 mr-7 border-b-2 transition-colors whitespace-nowrap",
                  activeTab === tab.key
                    ? "border-teal-500 text-teal-500 font-semibold"
                    : "border-transparent text-slate-400 dark:text-gray-400 font-normal hover:text-slate-600 dark:hover:text-gray-200",
                ].join(" ")}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-5 font-mono text-[13px] md:text-[13.5px] leading-relaxed text-slate-800 dark:text-gray-200 transition-colors">
            {activeTab === "activity" ? (
              activityLogEntries.map((entry, i) => (
                <div key={i} className="mb-3">
                  {entry}
                </div>
              ))
            ) : (
              <p className="text-slate-400 dark:text-gray-500 pt-2">Verificationnnnn loopsssss</p>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full md:flex-1 min-w-0">
          <FindingLogPanel />
        </div>
      </div>
      )}
    </div>
  );
}