"use client";

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function TopBar() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-4 md:px-8 py-3 bg-white dark:bg-[#0A0F13] border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="flex flex-wrap items-center gap-2 text-[14px] md:text-[15px]">
        <span className="font-medium text-gray-800 dark:text-gray-200">Scan</span>
        <Home size={16} className="text-gray-400 dark:text-gray-500" />
        <span className="text-gray-400 dark:text-gray-600">/</span>
        <span className="text-gray-500 dark:text-gray-400 font-medium">Private Assets</span>
        <span className="text-gray-400 dark:text-gray-600">/</span>
        <span className="text-[#0CC8A8] font-medium">New Scan</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <Button
          variant="outline"
          onClick={() => toast.success("Report exported successfully")}
          className="h-11 px-6 w-full sm:w-auto border-gray-300 dark:border-gray-600 font-semibold bg-white dark:bg-transparent text-black dark:text-gray-200 rounded-lg"
        >
          Export Report
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="h-11 px-6 w-full sm:w-auto rounded-lg bg-red-50 dark:bg-[#2A1114] font-semibold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-[#3A1519]"
            >
              Stop Scan
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="dark:bg-[#111827]">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to stop this scan?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action will terminate the ongoing scan process immediately.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  toast.success("Scan stopped successfully");
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                Proceed
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}