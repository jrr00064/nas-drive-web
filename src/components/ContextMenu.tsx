import { motion } from 'framer-motion';
import {
  Edit2,
  Move,
  Trash2,
  Info,
  Copy,
  Download,
  ExternalLink,
} from 'lucide-react';
import { useFileStore } from '@store/fileStore';
import { FileItem } from '@/types/index';

interface ContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  item: FileItem | null;
  onOpen: () => void;
  onRename: () => void;
  onMove: () => void;
  onDelete: () => void;
}

export const ContextMenu = ({
  isOpen,
  onClose,
  item,
  onOpen,
  onRename,
  onMove,
  onDelete,
}: ContextMenuProps) => {
  const { contextMenu } = useFileStore();

  if (!isOpen) return null;

  const menuItems = [
    {
      label: 'Open',
      icon: ExternalLink,
      onClick: () => {
        onOpen();
        onClose();
      },
      visible: item?.type === 'folder',
    },
    {
      label: 'Rename',
      icon: Edit2,
      onClick: () => {
        onRename();
        onClose();
      },
      visible: true,
    },
    {
      label: 'Move to',
      icon: Move,
      onClick: () => {
        onMove();
        onClose();
      },
      visible: true,
    },
    {
      label: 'Copy',
      icon: Copy,
      onClick: () => {
        onClose();
      },
      visible: true,
    },
    {
      label: 'Download',
      icon: Download,
      onClick: () => {
        onClose();
      },
      visible: item?.type !== 'folder',
    },
    {
      label: 'Properties',
      icon: Info,
      onClick: () => {
        onClose();
      },
      visible: true,
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: () => {
        onDelete();
        onClose();
      },
      visible: true,
      variant: 'danger' as const,
    },
  ];

  const visibleItems = menuItems.filter((i) => i.visible);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.1 }}
      data-context-menu
      style={{
        left: contextMenu.x,
        top: contextMenu.y,
      }}
      className="fixed z-50 min-w-[180px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1"
    >
      {item && (
        <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 mb-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[180px]">
            {item.name}
          </p>
        </div>
      )}

      {visibleItems.map((menuItem) => (
        <button
          key={menuItem.label}
          onClick={menuItem.onClick}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
            menuItem.variant === 'danger'
              ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <menuItem.icon className="w-4 h-4" />
          <span>{menuItem.label}</span>
        </button>
      ))}
    </motion.div>
  );
};
