import { motion, AnimatePresence } from 'framer-motion';
import { X, File, Folder, Calendar, HardDrive, FileType2, Hash, Clock } from 'lucide-react';
import { FileItem } from '@/types/index';
import { formatFileSize, formatDate, getFileExtension } from '@utils/fileHelpers';

interface PropertiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: FileItem | null;
}

export const PropertiesModal = ({ isOpen, onClose, item }: PropertiesModalProps) => {
  if (!item) return null;

  const properties = [
    { 
      label: 'Name', 
      value: item.name, 
      icon: item.type === 'folder' ? Folder : File,
      highlight: true,
    },
    { 
      label: 'Type', 
      value: item.type === 'folder' 
        ? 'Folder' 
        : `${getFileExtension(item.name).toUpperCase() || 'Unknown'} file`, 
      icon: FileType2,
    },
    { 
      label: 'Size', 
      value: item.size > 0 
        ? `${formatFileSize(item.size)} (${item.size.toLocaleString()} bytes)` 
        : item.type === 'folder' ? '—' : '0 bytes', 
      icon: HardDrive,
    },
    { 
      label: 'Created', 
      value: formatDate(item.createdAt), 
      icon: Clock,
    },
    { 
      label: 'Modified', 
      value: formatDate(item.modifiedAt), 
      icon: Calendar,
    },
    { 
      label: 'ID', 
      value: item.id.slice(0, 8) + '...', 
      icon: Hash,
    },
    { 
      label: 'Location', 
      value: item.parentId 
        ? 'Inside folder' 
        : 'Root directory', 
      icon: Folder,
    },
  ];

  const getTypeIconColor = () => {
    const colors: Record<string, string> = {
      folder: '#8b5cf6',
      image: '#f472b6',
      video: '#f87171',
      audio: '#22d3ee',
      document: '#fbbf24',
      archive: '#a78bfa',
      code: '#34d399',
      other: '#9ca3af',
    };
    return colors[item.type] || colors.other;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
            }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div
              className="p-6"
              style={{
                background: 'linear-gradient(145deg, rgba(26, 26, 29, 0.98), rgba(18, 18, 20, 0.99))',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Header */}
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'rgba(109, 40, 217, 0.15)',
                      border: '1px solid rgba(109, 40, 217, 0.3)',
                    }}
                  >
                    <FileType2 
                      className="w-5 h-5"
                      style={{ color: '#8b5cf6' }}
                    />
                  </div>
                  
                  <h2 
                    className="text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Properties
                  </h2>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg transition-all duration-200"
                  style={{
                    background: 'var(--bg-elevated)',
                    color: 'var(--text-tertiary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bg-hover)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-elevated)';
                    e.currentTarget.style.color = 'var(--text-tertiary)';
                  }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* File Preview */}
              
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${getTypeIconColor()}20, ${getTypeIconColor()}10)`,
                    border: `1px solid ${getTypeIconColor()}40`,
                    boxShadow: `0 8px 32px ${getTypeIconColor()}30`,
                  }}
                >
                  {item.type === 'folder' ? (
                    <Folder 
                      className="w-10 h-10"
                      style={{ color: getTypeIconColor() }}
                    />
                  ) : (
                    <File 
                      className="w-10 h-10"
                      style={{ color: getTypeIconColor() }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Properties List */}
              
              <div 
                className="rounded-xl overflow-hidden mb-5"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-default)',
                }}
              >
                {properties.map((prop, index) => (
                  <motion.div
                    key={prop.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="flex items-start gap-3 p-3"
                    style={{
                      borderBottom: index < properties.length - 1 
                        ? '1px solid var(--border-subtle)' 
                        : 'none',
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-default)',
                      }}
                    >
                      <prop.icon 
                        className="w-4 h-4"
                        style={{ color: 'var(--text-tertiary)' }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p 
                        className="text-xs mb-0.5"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {prop.label}
                      </p>
                      
                      <p 
                        className="text-sm font-medium truncate"
                        style={{ 
                          color: prop.highlight 
                            ? 'var(--text-primary)' 
                            : 'var(--text-secondary)',
                        }}
                        title={prop.value}
                      >
                        {prop.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Close Button */}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-hover)';
                  e.currentTarget.style.borderColor = 'var(--border-hover)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--bg-elevated)';
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
