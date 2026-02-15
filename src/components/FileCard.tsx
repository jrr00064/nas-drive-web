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
  folder: 'text-blue-500',
  image: 'text-purple-500',
  video: 'text-red-500',
  audio: 'text-pink-500',
  document: 'text-orange-500',
  archive: 'text-yellow-500',
  code: 'text-green-500',
  other: 'text-gray-500',
};

const bgMap: Record<FileType, string> = {
  folder: 'bg-blue-50 dark:bg-blue-900/20',
  image: 'bg-purple-50 dark:bg-purple-900/20',
  video: 'bg-red-50 dark:bg-red-900/20',
  audio: 'bg-pink-50 dark:bg-pink-900/20',
  document: 'bg-orange-50 dark:bg-orange-900/20',
  archive: 'bg-yellow-50 dark:bg-yellow-900/20',
  code: 'bg-green-50 dark:bg-green-900/20',
  other: 'bg-gray-50 dark:bg-gray-800',
};

interface FileCardProps {
  item: FileItem;
  onClick: () => void;
  onDoubleClick: () => void;
}

export const FileCard = ({ item, onClick, onDoubleClick }: FileCardProps) => {
  const { showContextMenu, clearSelection, toggleSelection, selectedItems } = useFileStore();
  const Icon = iconMap[item.type] || File;
  const iconColor = colorMap[item.type] || 'text-gray-500';
  const bgColor = bgMap[item.type] || 'bg-gray-50';
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={handleContextMenu}
      data-file-item={item.id}
      className={`group relative cursor-pointer rounded-xl border hover:shadow-lg transition-all overflow-hidden ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-800'
      }`}
    >
      <div className={`aspect-square flex items-center justify-center ${bgColor}`}>
        <Icon className={`w-16 h-16 ${iconColor}`} />
      </div>

      <div className="p-3">
        <h3
          className="font-medium text-sm text-gray-900 dark:text-white truncate"
          title={item.name}
        >
          {item.name}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {item.type === 'folder' ? 'Folder' : formatFileSize(item.size)}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {formatDate(item.modifiedAt).split(',')[0]}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
