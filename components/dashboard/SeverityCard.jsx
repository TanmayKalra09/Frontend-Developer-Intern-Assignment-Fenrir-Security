import { AlertTriangle, Ban, AlertCircle, Search, ArrowUp } from "lucide-react";

export default function SeverityCard({
  title,
  count,
  color,
  change,
  changeType,
}) {
  const iconMap = {
    red: <Ban className="w-4 h-4 text-pink-600" />,
    orange: <AlertTriangle className="w-4 h-4 text-orange-600" />,
    yellow: <AlertCircle className="w-4 h-4 text-yellow-600" />,
    blue: <Search className="w-4 h-4 text-blue-600" />,
  };

  const bgMap = {
    red: "bg-pink-100",
    orange: "bg-orange-100",
    yellow: "bg-yellow-100",
    blue: "bg-blue-100",
  };

  const changeColor =
    changeType === "increase"
      ? "text-pink-600"
      : "text-green-600";

  const arrow = changeType === "increase" ? <ArrowUp size={12} className="text-pink-600" /> : <ArrowUp size={12} className="text-green-600 rotate-180" />;

  return (
    <div className="w-full">
      <div className="flex items-center mr-10 justify-between">
        <div className="text-gray-400 text-sm md:text-md font-semibold">
          {title}
        </div>

        <div
          className={`w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl flex items-center justify-center ${bgMap[color]}`}
        >
          {iconMap[color]}
        </div>
      </div>

      <div className="flex items-start md:items-center gap-3 md:gap-4 mt-3 md:mt-4">
        <div className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
          {count}
        </div>

        <div className={`flex flex-wrap items-center mt-1 md:mt-2 text-xs md:text-sm font-medium ${changeColor}`}>
          <span className="mr-0.5">{arrow}</span>
          <span className=" text-[10px] font-semibold mr-1">{change}</span>
          <span className="text-[10px] font-semibold whitespace-nowrap">
            {changeType === "increase"
              ? "increase than yesterday"
              : "decrease than yesterday"}
          </span>
        </div>
      </div>
    </div>
  );
}