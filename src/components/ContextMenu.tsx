import { motion, AnimatePresence } from 'framer-motion';
import {
  Edit2,
  Move,
  Trash2,
  Info,
  Copy,
  Download,
  ExternalLink,
  FolderOpen,
  File,
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
  onProperties: () => void;
}

export const ContextMenu = ({
  isOpen,
  onClose,
  item,
  onOpen,
  onRename,
  onMove,
  onDelete,
  onProperties,
}: ContextMenuProps) => {
  const { contextMenu } = useFileStore();

  if (!isOpen) return null;

  const menuItems = [
    {
      label: 'Open',
      icon: item?.type === 'folder' ? FolderOpen : ExternalLink,
      onClick: () => {
        onOpen();
        onClose();
      },
      visible: item?.type === 'folder',
      accent: true,
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
    { separator: true, visible: true },
    {
      label: 'Properties',
      icon: Info,
      onClick: () => {
        onProperties();
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
          data-context-menu
          style={{
            left: contextMenu.x,
            top: contextMenu.y,
            width: '200px',
            background: 'linear-gradient(145deg, rgba(35, 35, 38, 0.98), rgba(26, 26, 29, 0.98))',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(12px)',
          }}
          className="fixed z-50 py-1.5"
        >
          {/* Header with item name */}
          {item && (
            <div 
              className="px-3 py-2 mb-1"
              style={{ 
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{
                    background: item.type === 'folder' 
                      ? 'rgba(139, 92, 246, 0.2)'
                      : 'rgba(156, 163, 175, 0.2)',
                  }}
                >
                  {item.type === 'folder' ? (
                    <FolderOpen className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
                  ) : (
                    <File className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                  )}
                </div>
                <p 
                  className="text-xs font-medium truncate flex-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.name}
                </p>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <div className="px-1">
            {visibleItems.map((menuItem, index) => (
              <div key={index}>
                {'separator' in menuItem ? (
                  <div
                    className="my-1.5 mx-1 h-px"
                    style={{ background: 'var(--border-subtle)' }}
                  />
                ) : (
                  <motion.button
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={menuItem.onClick}
                    className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 group"
                    style={{
                      color: menuItem.variant === 'danger' 
                        ? 'var(--accent-danger)'
                        : menuItem.accent 
                          ? 'var(--accent-primary)'
                          : 'var(--text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = menuItem.variant === 'danger'
                        ? 'rgba(239, 68, 68, 0.1)'
                        : menuItem.accent
                          ? 'rgba(139, 92, 246, 0.1)'
                          : 'var(--bg-elevated)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center transition-all duration-150"
                      style={{
                        background: menuItem.variant === 'danger'
                          ? 'rgba(239, 68, 68, 0.15)'
                          : menuItem.accent
                            ? 'rgba(139, 92, 246, 0.15)'
                            : 'var(--bg-tertiary)',
                      }}
                    >
                      <menuItem.icon 
                        className="w-3.5 h-3.5" 
                        style={{
                          color: menuItem.variant === 'danger'
                            ? 'var(--accent-danger)'
                            : menuItem.accent
                              ? 'var(--accent-primary)'
                              : 'var(--text-tertiary)',
                        }}
                      />
                    </div>
                    
                    <span className="font-medium">{menuItem.label}</span>
                  </motion.button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
