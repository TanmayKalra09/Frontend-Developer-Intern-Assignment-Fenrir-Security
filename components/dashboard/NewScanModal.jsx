"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function NewScanModal({ onScanAdded }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("Greybox");
  const [status, setStatus] = useState("Scheduled");

  const handleSubmit = () => {
    if (!name.trim()) return;

    const newScan = {
      name,
      type,
      status,
      progress: status === "Completed" ? 100 : status === "Failed" ? 10 : 0,
      vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
      lastScan: "just now",
    };

    const existing = JSON.parse(localStorage.getItem("scans") || "[]");
    const updated = [...existing, newScan];

    localStorage.setItem("scans", JSON.stringify(updated));

    if (onScanAdded) onScanAdded(updated);

    setName("");
    setType("Greybox");
    setStatus("Scheduled");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-teal-600 hover:bg-teal-700 text-white  rounded-sm"
        >
          New Scan
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 p-6 shadow-xl border border-gray-200 dark:border-gray-700 transition-colors">
        <DialogHeader>
          <DialogTitle>Create New Scan</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 font-medium transition-colors">Scan Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter scan name"
              className="mt-1 bg-white dark:bg-[#161A20] dark:border-gray-700 dark:text-gray-100 transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 font-medium transition-colors">Type</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="mt-1 bg-white dark:bg-[#161A20] dark:border-gray-700 dark:text-gray-100 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#161A20] border border-gray-200 dark:border-gray-700 text-black dark:text-gray-100 shadow-lg rounded-lg z-50 transition-colors">
                <SelectItem value="Greybox">Greybox</SelectItem>
                <SelectItem value="Blackbox">Blackbox</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 font-medium transition-colors">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="mt-1 bg-white dark:bg-[#161A20] dark:border-gray-700 dark:text-gray-100 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#161A20] border border-gray-200 dark:border-gray-700 text-black dark:text-gray-100 shadow-lg rounded-lg z-50 transition-colors">
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 text-white rounded-lg transition-colors"
          >
            Create Scan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}