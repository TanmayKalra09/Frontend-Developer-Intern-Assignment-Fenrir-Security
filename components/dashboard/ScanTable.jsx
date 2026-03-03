"use client";

import { useState, useEffect } from "react";
import { Search, Columns2, Plus, ListFilter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import StatusBadge from "./StatusBadge";
import VulnerabilityBadges from "./VulnerabilityBadges";
import NewScanModal from "./NewScanModal";
import { toast } from "sonner";

const mockScans = [
  {
    name: "Web App Servers",
    type: "Greybox",
    status: "Completed",
    progress: 100,
    vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
    lastScan: "4d ago",
  },
  {
    name: "Web App Servers",
    type: "Greybox",
    status: "Scheduled",
    progress: 100,
    vulnerabilities: { critical: 5, high: 12, medium: 0, low: 0 },
    lastScan: "4d ago",
  },
  {
    name: "IoT Devices",
    type: "Blackbox",
    status: "Failed",
    progress: 10,
    vulnerabilities: { critical: 2, high: 4, medium: 8, low: 1 },
    lastScan: "3d ago",
  },
  {
    name: "Temp Data",
    type: "Blackbox",
    status: "Failed",
    progress: 10,
    vulnerabilities: { critical: 2, high: 4, medium: 8, low: 1 },
    lastScan: "3d ago",
  },
];

export default function ScanTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [scans, setScans] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("scans") || "[]");
    setScans([...mockScans, ...stored]);
  }, []);

  const filteredScans = scans.filter((scan) => {
    const matchesSearch =
      scan.name.toLowerCase().includes(search.toLowerCase()) ||
      scan.type.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || scan.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredScans.length / itemsPerPage);

  const paginatedScans = filteredScans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  return (
    <div className="bg-white dark:bg-[#161A20] mt-[-10px]  dark:border-gray-800 rounded-2xl  p-6 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:flex-1 md:mr-4">
          <Search className="absolute left-3 top-1/2  -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161A20] text-gray-900 dark:text-gray-100 rounded-sm pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
            placeholder="Search scans by name or type..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px] h-10 rounded-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161A20] shadow-sm text-gray-600 dark:text-gray-200 flex items-center gap-2 px-3 transition-colors">
              <ListFilter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
            </SelectTrigger>

            <SelectContent
              position="popper"
              sideOffset={4}
              className="z-50 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 shadow-lg rounded-sm text-black dark:text-gray-200"
            >
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={() => toast.success("Names are sorted through columns")}
            className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161A20] rounded-sm px-4 py-2 text-sm text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Columns2 className="w-4 h-4" /> Column
          </button>

          <NewScanModal
            onScanAdded={(newStoredScans) =>
              setScans([...mockScans, ...newStoredScans])
            }
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] w-full text-left">
        <thead className="text-gray-400 dark:text-gray-500 text-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
          <tr>
            <th className="py-3 font-medium">Scan Name</th>
            <th className="hidden sm:table-cell font-medium">Type</th>
            <th className="font-medium">Status</th>
            <th className="font-medium">Progress</th>
            <th className="font-medium">Vulnerability</th>
            <th className="font-medium text-right">Last Scan</th>
          </tr>
        </thead>

        <tbody>
          {paginatedScans.map((scan, i) => (
            <tr key={i} className="border-b border-gray-200 dark:border-gray-700 last:border-0 transition-colors">
              <td className="py-3 md:py-4 font-medium text-gray-800 dark:text-gray-100 transition-colors">
                {scan.name}
              </td>

              <td className="hidden sm:table-cell text-gray-600 dark:text-gray-300 transition-colors">{scan.type}</td>

              <td>
                <StatusBadge status={scan.status} />
              </td>

              <td>
                <div className="flex items-center gap-3">
                  <div className="w-20 sm:w-28 md:w-32 bg-gray-200 dark:bg-gray-700 h-2 rounded-full transition-colors">
                    <div
                      className={`${
                        scan.status === "Failed"
                          ? "bg-red-500"
                          : "bg-teal-500"
                      } h-2 rounded-full`}
                      style={{ width: `${scan.progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors">
                    {scan.progress}%
                  </span>
                </div>
              </td>

              <td>
                <VulnerabilityBadges data={scan.vulnerabilities} />
              </td>

              <td className="text-right text-gray-500 dark:text-gray-400 text-sm transition-colors">
                {scan.lastScan}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
        <div>
          Showing {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, filteredScans.length)} of {filteredScans.length} Scans
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40"
          >
            ‹
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}