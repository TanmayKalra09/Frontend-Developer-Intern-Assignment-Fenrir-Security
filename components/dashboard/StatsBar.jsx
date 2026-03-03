"use client";

import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import SeverityCard from "./SeverityCard";

export default function StatsBar() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [rotating, setRotating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRotating(true);
    setLastUpdated(new Date());

    setTimeout(() => {
      setRotating(false);
    }, 800);
  };

  const getTimeAgo = () => {
    const diff = Math.floor((new Date() - lastUpdated) / 60000);
    if (diff === 0) return "just now";
    if (diff === 1) return "1 min ago";
    return `${diff} mins ago`;
  };

  return (
    <div className="w-full mt-[-12px]  bg-white  rounded-2xl dark:bg-[#161A20] dark:border dark:border-gray-800 px-4 md:px-8 py-6 transition-colors">

      <div className="flex flex-col md:flex-row md:items-center w-full text-sm text-gray-400 dark:text-gray-500 pb-6 gap-4 md:gap-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:items-center gap-y-3 gap-x-6 md:gap-6 md:mr-10 flex-1 md:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="text-gray-400 font-semibold text-xs">Org:</span>{" "}
            <span className="text-gray-700 dark:text-gray-200 font-semibold">Project X</span>
          </div>

          <div className="hidden md:block h-5 w-px bg-gray-300 dark:bg-white"></div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="text-gray-400 text-xs font-semibold">Owner:</span>{" "}
            <span className="text-gray-700 dark:text-gray-200 font-semibold">Nammagiri</span>
          </div>

          <div className="hidden md:block h-5 w-px bg-gray-300 dark:bg-white"></div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="text-gray-400 font-semibold text-xs">Total Scans:</span>{" "}
            <span className="text-gray-700 dark:text-gray-200 font-semibold">100</span>
          </div>

          <div className="hidden md:block h-5 w-px bg-gray-300 dark:bg-white"></div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="text-gray-400 text-xs font-semibold">Scheduled:</span>{" "}
            <span className="text-gray-700 dark:text-gray-200 font-semibold">1000</span>
          </div>

          <div className="hidden md:block h-5 w-px bg-gray-300 dark:bg-white"></div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="text-gray-400 text-xs font-semibold">Rescans:</span>{" "}
            <span className="text-gray-700 dark:text-gray-200 font-semibold">100</span>
          </div>

          <div className="hidden md:block h-5 w-px bg-gray-300 dark:bg-white"></div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="text-gray-400 text-xs font-semibold">Failed Scans:</span>{" "}
            <span className="text-gray-700 dark:text-gray-200 font-semibold">100</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-green-600 font-medium self-start md:self-auto">
          <RefreshCcw
            onClick={handleRefresh}
            className={`w-5 h-5 cursor-pointer transition-transform duration-700 ${
              rotating ? "rotate-180" : ""
            }`}
          />
          <span className="text-gray-500 dark:text-gray-400">{getTimeAgo()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 md:mt-8">
        <div>
          <SeverityCard
            title="Critical Severity"
            count={86}
            color="red"
            change="+2%"
            changeType="increase"
          />
        </div>

        <div>
          <SeverityCard
            title="High Severity"
            count={16}
            color="orange"
            change="+0.9%"
            changeType="increase"
          />
        </div>

        <div>
          <SeverityCard
            title="Medium Severity"
            count={26}
            color="yellow"
            change="+0.9%"
            changeType="decrease"
          />
        </div>

        <div>
          <SeverityCard
            title="Low Severity"
            count={16}
            color="blue"
            change="+0.9%"
            changeType="increase"
          />
        </div>
      </div>
    </div>
  );
}