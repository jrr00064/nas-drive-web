import { motion } from 'framer-motion';
import { Folder, File, Image, Video, FileText, Archive, Music, Code } from 'lucide-react';
import { useFileStore } from '@store/fileStore';
import { FileItem, FileType } from '@/types/index';
import { formatFileSize, formatDate } from '@utils/fileHelpers';

const iconMap: Record<FileType, React.ElementType> = {
  folder: Folder,
  image: Image,
  video: Video,
  audio: Music,
  document: FileText,
  archive: Archive,
  code: Code,
  other: File,
};

const colorMap: Record<FileType, string> = {
  folder: '#8b5cf6',
  image: '#f472b6',
  video: '#f87171',
  audio: '#22d3ee',
  document: '#fbbf24',
  archive: '#a78bfa',
  code: '#34d399',
  other: '#9ca3af',
};

const bgGradientMap: Record<FileType, string> = {
  folder: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05))',
  image: 'linear-gradient(135deg, rgba(244, 114, 182, 0.15), rgba(244, 114, 182, 0.05))',
  video: 'linear-gradient(135deg, rgba(248, 113, 113, 0.15), rgba(248, 113, 113, 0.05))',
  audio: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(34, 211, 238, 0.05))',
  document: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(251, 191, 36, 0.05))',
  archive: 'linear-gradient(135deg, rgba(167, 139, 250, 0.15), rgba(167, 139, 250, 0.05))',
  code: 'linear-gradient(135deg, rgba(52, 211, 153, 0.15), rgba(52, 211, 153, 0.05))',
  other: 'linear-gradient(135deg, rgba(156, 163, 175, 0.15), rgba(156, 163, 175, 0.05))',
};

interface FileCardProps {
  item: FileItem;
  onClick: () => void;
  onDoubleClick: () => void;
}

export const FileCard = ({ item, onClick, onDoubleClick }: FileCardProps) => {
  const { showContextMenu, clearSelection, toggleSelection, selectedItems } = useFileStore();
  const Icon = iconMap[item.type] || File;
  const iconColor = colorMap[item.type] || '#9ca3af';
  const bgGradient = bgGradientMap[item.type] || bgGradientMap.other;
  const isSelected = selectedItems.has(item.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.ctrlKey || e.metaKey) {
      toggleSelection(item.id);
    } else {
      clearSelection();
      toggleSelection(item.id);
      onClick();
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    showContextMenu(e.clientX, e.clientY, item);
  };

  return (
    <motion.div
      layout
      layoutId={item.id}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      whileHover={{ 
        scale: 1.03, 
        y: -4,
        transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={handleContextMenu}
      data-file-item={item.id}
      className="group relative cursor-pointer overflow-hidden"
      style={{
        background: isSelected 
          ? 'linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.05))'
          : 'linear-gradient(145deg, rgba(26, 26, 29, 0.8), rgba(18, 18, 20, 0.9))',
        border: isSelected 
          ? '1px solid rgba(139, 92, 246, 0.4)'
          : '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: isSelected 
          ? '0 8px 24px rgba(139, 92, 246, 0.2), 0 0 0 1px rgba(139, 92, 246, 0.3)'
          : 'var(--shadow-md)',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'var(--border-hover)';
          e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'var(--border-default)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }
      }}
    >
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${iconColor}15, transparent 70%)`,
        }}
      />

      {/* Icon Container */}
      <div 
        className="aspect-square flex items-center justify-center relative overflow-hidden"
        style={{ 
          background: bgGradient,
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Icon 
            className="w-14 h-14 drop-shadow-lg"
            style={{ color: iconColor }}
          />
        </motion.div>

        {/* Selection Indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
            style={{
              background: 'var(--accent-primary)',
              boxShadow: '0 2px 8px rgba(139, 92, 246, 0.4)',
            }}
          >
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 relative">
        <h3
          className="font-medium text-sm truncate mb-1.5"
          style={{ color: 'var(--text-primary)' }}
          title={item.name}
        >
          {item.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span 
            className="text-xs"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {item.type === 'folder' ? 'Folder' : formatFileSize(item.size)}
          </span>
          
          <span 
            className="text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            {formatDate(item.modifiedAt)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
