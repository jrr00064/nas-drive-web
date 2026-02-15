import { motion } from 'framer-motion';
import { HardDrive } from 'lucide-react';
import { useFileStore } from '@store/fileStore';
import { formatFileSize } from '@utils/fileHelpers';

export const StorageBar = () => {
  const { getStorageStats } = useFileStore();
  const stats = getStorageStats();
  const percentage = (stats.used / stats.total) * 100;

  const getColor = () => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 75) return 'bg-yellow-500';
    if (percentage < 90) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <HardDrive className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Storage</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatFileSize(stats.used)} used of {formatFileSize(stats.total)}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`absolute h-full rounded-full ${getColor()}`}
        />
      </div>

      <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
        <span>{formatFileSize(stats.used)} used</span>
        <span>{formatFileSize(stats.available)} available</span>
      </div>
    </motion.div>
  );
};
