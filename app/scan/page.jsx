import ScanProgressHeader from "@/components/scan/ScanProgressHeader";
import LiveScanConsole from "@/components/scan/LiveScanConsole";
import FindingLogPanel from "@/components/scan/FindingLogPanel";
import BottomStatusBar from "@/components/scan/BottomStatusBar";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/dashboard/TopBar";

export default function ScanPage() {

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F4F6F8] dark:bg-black transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col w-full">
        <TopBar />

        <div className="flex-1 p-4 md:p-6 space-y-6 overflow-x-hidden">
          <ScanProgressHeader/>

          <div className="w-full">
            <LiveScanConsole />
          </div>

        </div>
        <div className="mt-auto">
          <BottomStatusBar />
        </div>
      </div>
    </div>
    
  );
}