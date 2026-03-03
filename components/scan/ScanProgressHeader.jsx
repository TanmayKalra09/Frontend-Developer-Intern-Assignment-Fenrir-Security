"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Search, Boxes, FlaskConical, ClipboardCheck, FileText } from "lucide-react";

const steps = [
  { label: "Spidering", icon: Search },
  { label: "Mapping", icon: Boxes },
  { label: "Testing", icon: FlaskConical },
  { label: "Validating", icon: ClipboardCheck },
  { label: "Reporting", icon: FileText },
];

export default function ScanProgressHeader({ data = {
  progress: 0,
  status: "In Progress",
  step: "Spidering",
  scanType: "Grey Box",
  target: "google.com",
  startedAt: "Nov 22, 09:00AM",
  credentials: "2 Active",
  files: "Control.pdf",
  checklist: "40/350",
} }) {
  return (
    <Card className="px-4 md:px-6 py-4 md:py-3 mt-[-15px] bg-white dark:bg-[#161A20] border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm transition-colors">
      <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-0">

        <div className="flex-shrink-0 md:mr-6 flex justify-center md:block">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-[#0F172A] dark:bg-[#0B1220] transition-colors">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold leading-tight" style={{ color: "#2DD4BF" }}>
                {data.progress}%
              </div>
              <div className="text-xs text-gray-300 mt-0.5">{data.status}</div>
            </div>
          </div>
        </div>

        <div className="hidden md:block self-stretch w-px bg-gray-200 dark:bg-gray-700 mr-6 flex-shrink-0 transition-colors" />

        <div className="flex-1 min-w-0">

          <div className="relative w-full mb-5">
            <div className="hidden md:block absolute top-[22px] left-0 right-0 h-px bg-gray-200 dark:bg-gray-700 transition-colors" />

            <div className="relative grid grid-cols-3 sm:grid-cols-5 md:flex md:items-start md:justify-between gap-y-6 md:gap-y-0">
              {steps.map((step) => {
                const isActive = step.label === data.step;
                const Icon = step.icon;

                return (
                  <div key={step.label} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border-2 bg-white dark:bg-black transition-all",
                        isActive
                          ? " border-teal-400  bg-teal-400 text-white dark:bg-teal-400 shadow-md"
                          : "border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500"
                      )}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </div>

                    <span
                      className={cn(
                        "text-[10px] sm:text-xs mt-2 whitespace-nowrap font-medium text-center",
                        isActive ? "text-gray-800 dark:text-gray-100" : "text-gray-400 dark:text-gray-500"
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 dark:bg-gray-700 mb-4 transition-colors" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:items-center px-0 md:px-10 gap-y-4 gap-x-4 sm:gap-6 md:gap-20">
            <InfoItem label="Scan Type" value={data.scanType} />
            <InfoItem label="Targets" value={data.target} />
            <InfoItem label="Started At" value={data.startedAt} />
            <InfoItem label="Credentials" value={data.credentials} />
            <InfoItem label="Files" value={data.files} />
            <InfoItem label="Checklists" value={data.checklist} highlight />
          </div>
        </div>
      </div>
    </Card>
  );
}

function InfoItem({ label, value, highlight }) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="text-xs font-medium text-gray-400 dark:text-gray-500 transition-colors">{label}</div>
      <div
        className={cn(
          "text-sm font-semibold",
          highlight ? "text-teal-500" : "text-gray-800 dark:text-gray-100"
        )}
      >
        {value}
      </div>
    </div>
  );
}