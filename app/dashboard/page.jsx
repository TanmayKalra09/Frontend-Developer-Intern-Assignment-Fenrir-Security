"use client";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import StatsBar from "@/components/dashboard/StatsBar";
import ScanTable from "@/components/dashboard/ScanTable";

export default function DashboardPage() {
  return (
    <div id="dashboard-root" className="flex flex-col md:flex-row min-h-screen bg-[#F6F7F9] dark:bg-[#0F172A] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col w-full">
        <TopBar />

        <div className="p-4 md:p-6 space-y-6">
            <StatsBar />
          <ScanTable />
        </div>
      </div>
    </div>
  );
}