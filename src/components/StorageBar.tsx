import { motion } from 'framer-motion';
import { HardDrive, Cloud, TrendingUp } from 'lucide-react';
import { useFileStore } from '@store/fileStore';
import { formatFileSize } from '@utils/fileHelpers';

export const StorageBar = () => {
  const { getStorageStats } = useFileStore();
  const stats = getStorageStats();
  const percentage = (stats.used / stats.total) * 100;

  const getColor = () => {
    if (percentage < 50) return 'from-emerald-500 to-teal-400';
    if (percentage < 75) return 'from-amber-500 to-yellow-400';
    if (percentage < 90) return 'from-orange-500 to-amber-500';
    return 'from-red-500 to-rose-400';
  };

  const getStatusColor = () => {
    if (percentage < 50) return '#34d399';
    if (percentage < 75) return '#fbbf24';
    if (percentage < 90) return '#f97316';
    return '#ef4444';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="p-5"
      style={{
        background: 'linear-gradient(145deg, rgba(26, 26, 29, 0.8), rgba(18, 18, 20, 0.9))',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.15))',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              boxShadow: '0 8px 24px rgba(139, 92, 246, 0.2)',
            }}
          >
            <HardDrive 
              className="w-6 h-6"
              style={{ color: 'var(--accent-primary)' }}
            />
          </motion.div>
          
          <div>
            <h3 
              className="font-semibold text-base"
              style={{ color: 'var(--text-primary)' }}
            >
              Storage Overview
            </h3>
            <p 
              className="text-sm"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {formatFileSize(stats.used)} used of {formatFileSize(stats.total)}
            </p>
          </div>
        </div>

        <div className="text-right">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold"
            style={{ 
              color: getStatusColor(),
              textShadow: `0 0 20px ${getStatusColor()}40`,
            }}
          >
            {percentage.toFixed(1)}%
          </motion.div>
          
          <div 
            className="text-xs mt-1 flex items-center justify-end gap-1"
            style={{ color: 'var(--text-muted)' }}
          >
            <TrendingUp className="w-3 h-3" />
            {formatFileSize(stats.available)} free
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div 
        className="relative h-3 rounded-full overflow-hidden mb-3"
        style={{ background: 'var(--bg-elevated)' }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className={`absolute h-full rounded-full bg-gradient-to-r ${getColor()}`}
          style={{
            boxShadow: `0 0 20px ${getStatusColor()}60`,
          }}
        />

        {/* Shine effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          }}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { label: 'Used', value: formatFileSize(stats.used), color: 'var(--accent-primary)' },
          { label: 'Available', value: formatFileSize(stats.available), color: '#06b6d4' },
          { label: 'Total', value: formatFileSize(stats.total), color: 'var(--text-secondary)' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="p-3 rounded-xl"
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-default)',
            }}
          >
            <p 
              className="text-xs mb-1"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {stat.label}
            </p>
            
            <p 
              className="font-semibold text-sm"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Status Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 flex items-center gap-2 p-3 rounded-xl"
        style={{
          background: percentage > 90 
            ? 'rgba(239, 68, 68, 0.1)' 
            : percentage > 75 
              ? 'rgba(249, 115, 22, 0.1)'
              : 'rgba(34, 197, 94, 0.1)',
          border: `1px solid ${percentage > 90 
            ? 'rgba(239, 68, 68, 0.2)' 
            : percentage > 75 
              ? 'rgba(249, 115, 22, 0.2)'
              : 'rgba(34, 197, 94, 0.2)'}`,
        }}
      >
        <Cloud 
          className="w-4 h-4"
          style={{ 
            color: percentage > 90 
              ? 'var(--accent-danger)' 
              : percentage > 75 
                ? 'var(--accent-warning)'
                : 'var(--accent-success)',
          }}
        />
        <p 
          className="text-sm"
          style={{ 
            color: percentage > 90 
              ? 'var(--accent-danger)' 
              : percentage > 75 
                ? 'var(--accent-warning)'
                : 'var(--accent-success)',
          }}
        >
          {percentage > 90 
            ? 'Storage critically low! Clean up some space.' 
            : percentage > 75 
              ? 'Storage usage is getting high. Consider organizing files.'
              : 'Storage usage is healthy. You have plenty of space.'}
        </p>
      </motion.div>
    </motion.div>
  );
};
