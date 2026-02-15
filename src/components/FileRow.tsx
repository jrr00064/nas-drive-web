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
  folder: 'text-blue-500',
  image: 'text-purple-500',
  video: 'text-red-500',
  audio: 'text-pink-500',
  document: 'text-orange-500',
  archive: 'text-yellow-500',
  code: 'text-green-500',
  other: 'text-gray-500',
};

interface FileRowProps {
  item: FileItem;
  onClick: () => void;
  onDoubleClick: () => void;
}

export const FileRow = ({ item, onClick, onDoubleClick }: FileRowProps) => {
  const { selectedItems, toggleSelection, showContextMenu, clearSelection } = useFileStore();
  const Icon = iconMap[item.type] || File;
  const iconColor = colorMap[item.type] || 'text-gray-500';
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
      exit={{ opacity: 0, x: -20 }}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={handleContextMenu}
      data-file-item={item.id}
      className={`grid grid-cols-[auto_1fr_120px_160px_100px] gap-4 px-4 py-3 cursor-pointer transition-colors group hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
        isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
      }`}
    >
      <div className="flex items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSelection(item.id);
          }}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            isSelected
              ? 'bg-blue-500 border-blue-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
          }`}
        >
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </button>
      </div>

      <div className="flex items-center gap-3 min-w-0">
        <Icon className={`w-5 h-5 ${iconColor} shrink-0`} />
        <span className="font-medium text-gray-900 dark:text-white truncate" title={item.name}>
          {item.name}
        </span>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        {item.size > 0 ? formatFileSize(item.size) : '—'}
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        {formatDate(item.modifiedAt)}
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
        {item.type === 'folder' ? 'Folder' : item.type}
      </div>
    </motion.div>
  );
};
