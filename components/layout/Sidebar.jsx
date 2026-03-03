"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardCheck,
  FileSearch,
  Calendar,
  Bell,
  Settings,
  Info,
  ChevronRight,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    const newTheme = isDark ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };
  return (
    <>
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-[#0A0F13] border-b border-gray-200 dark:border-gray-700">
        <span className="text-[18px] font-semibold text-[#0CC8A8]">aps</span>
        <button onClick={() => setIsOpen(true)}>
          <Menu size={22} className="text-gray-700 dark:text-gray-200" />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white dark:bg-[#0A0F13] border-r shadow-md flex flex-col justify-between min-h-screen transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
      <div>
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={22} className="text-gray-700 dark:text-gray-200" />
          </button>
        </div>
        <div className="px-6 pt-6 pb-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0CC8A8] rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
          <span className="text-[20px] font-semibold text-[#0CC8A8]">aps</span>
        </div>

        <nav className="px-4 mt-4 space-y-2">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={pathname === "/dashboard" || (!pathname.startsWith("/scan") && !pathname.startsWith("/projects") && !pathname.startsWith("/schedule"))}
            onClick={() => {
              router.push("/dashboard");
              setIsOpen(false);
            }}
          />
          <SidebarItem icon={<ClipboardCheck size={20} />} label="Projects" />
          <SidebarItem
            icon={<FileSearch size={20} />}
            label="Scans"
            notification
            active={pathname.startsWith("/scan")}
            onClick={() => {
              router.push("/scan");
              setIsOpen(false);
            }}
          />
          <SidebarItem icon={<Calendar size={20} />} label="Schedule" />
        </nav>

        <div className="my-6 border-t border-gray-200 dark:border-gray-700 transition-colors" />

        <nav className="px-4 space-y-2">
          <SidebarItem icon={<Bell size={20} />} label="Notifications" notification />
          <SidebarItem icon={<Settings size={20} />} label="Settings" />
          <SidebarItem icon={<Info size={20} />} label="Support" />
        </nav>
      </div>

      <div className="px-6 pb-4 mt-20 md:mt-40 flex items-center justify-between">
        <span className="text-sm text-gray-600 dark:text-gray-300">Dark Mode</span>
        <button
          onClick={toggleTheme}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            theme === "dark" ? "bg-[#0CC8A8]" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              theme === "dark" ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between bg-white dark:bg-[#111827] transition-colors">
        <div className="flex items-center gap-3">
          <img
            src="/pfp.png"
            alt="pfp"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">admin@edu.com</div>
            <div className="font-semibold text-gray-800 dark:text-gray-100">Security Lead</div>
          </div>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
      </div>
      </div>
    </>
  );
}

function SidebarItem({ icon, label, active = false, notification, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-2.5 rounded-full cursor-pointer transition-all ${
        active
          ? "bg-[#D7F2EE] dark:bg-[#0F2E2A] text-[#0CC8A8] font-medium"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      <div className="relative">
        {notification && (
          <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-orange-500 rounded-full" />
        )}
        {icon}
      </div>
      {label}
    </div>
  );
}