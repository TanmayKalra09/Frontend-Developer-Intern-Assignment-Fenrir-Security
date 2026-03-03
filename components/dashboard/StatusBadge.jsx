export default function StatusBadge({ status }) {
  const map = {
    Completed:
      "bg-green-100 text-green-600 border border-green-400 dark:bg-[#0F2E2A] dark:text-green-400 dark:border-green-800",
    Failed:
      "bg-red-100 text-red-600 border border-red-400 dark:bg-[#2A1114] dark:text-red-400 dark:border-red-800",
    Scheduled:
      "bg-gray-100 text-gray-600 border border-gray-400 dark:bg-[#1F2937] dark:text-gray-300 dark:border-gray-700",
  };

  return (
    <span className={`px-3 py-1  rounded-md text-sm ${map[status]}`}>
      {status}
    </span>
  );
}