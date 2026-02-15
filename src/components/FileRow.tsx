import { motion } from 'framer-motion';
import { Folder, File, Image, Video, FileText, Archive, Music, Code, Check } from 'lucide-react';
import { FileItem, FileType } from '@/types/index';
import { formatFileSize, formatDate } from '@utils/fileHelpers';
import { useFileStore } from '@store/fileStore';

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

const bgMap: Record<FileType, string> = {
  folder: 'rgba(139, 92, 246, 0.1)',
  image: 'rgba(244, 114, 182, 0.1)',
  video: 'rgba(248, 113, 113, 0.1)',
  audio: 'rgba(34, 211, 238, 0.1)',
  document: 'rgba(251, 191, 36, 0.1)',
  archive: 'rgba(167, 139, 250, 0.1)',
  code: 'rgba(52, 211, 153, 0.1)',
  other: 'rgba(156, 163, 175, 0.1)',
};

interface FileRowProps {
  item: FileItem;
  onClick: () => void;
  onDoubleClick: () => void;
}

export const FileRow = ({ item, onClick, onDoubleClick }: FileRowProps) => {
  const { selectedItems, toggleSelection, showContextMenu, clearSelection } = useFileStore();
  const Icon = iconMap[item.type] || File;
  const iconColor = colorMap[item.type] || '#9ca3af';
  const bgColor = bgMap[item.type] || bgMap.other;
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ 
        backgroundColor: 'var(--bg-elevated)',
        transition: { duration: 0.15 }
      }}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={handleContextMenu}
      data-file-item={item.id}
      className="group cursor-pointer transition-colors"
      style={{
        backgroundColor: isSelected ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
        borderLeft: isSelected ? '3px solid var(--accent-primary)' : '3px solid transparent',
      }}
    >
      <div className="grid grid-cols-[auto_1fr_120px_160px_100px] gap-4 px-4 py-3 items-center">
        {/* Checkbox */}
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleSelection(item.id);
            }}
            className="w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200"
            style={{
              background: isSelected ? 'var(--accent-primary)' : 'var(--bg-elevated)',
              border: isSelected 
                ? '1px solid var(--accent-primary)'
                : '1px solid var(--border-default)',
              boxShadow: isSelected ? '0 2px 8px rgba(139, 92, 246, 0.3)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.borderColor = 'var(--border-default)';
              }
            }}
          >
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.15 }}
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.button>
        </div>

        {/* Name & Icon */}
        <div className="flex items-center gap-3 min-w-0">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: bgColor }}
          >
            <Icon 
              className="w-4 h-4 shrink-0" 
              style={{ color: iconColor }}
            />
          </motion.div>
          
          <span 
            className="font-medium text-sm truncate transition-colors duration-200"
            style={{ 
              color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
            }}
            title={item.name}
          >
            {item.name}
          </span>
        </div>

        {/* Size */}
        <div 
          className="text-sm"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {item.size > 0 ? formatFileSize(item.size) : '—'}
        </div>

        {/* Modified Date */}
        <div 
          className="text-sm"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {formatDate(item.modifiedAt)}
        </div>

        {/* Type */}
        <div 
          className="text-sm capitalize flex items-center gap-2"
          style={{ color: 'var(--text-muted)' }}
        >
          <span 
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: iconColor }}
          />
          {item.type === 'folder' ? 'Folder' : item.type}
        </div>
      </div>
    </motion.div>
  );
};
