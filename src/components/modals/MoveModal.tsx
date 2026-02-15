import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Folder, ChevronRight, MoveRight, Home } from 'lucide-react';
import { useFileStore } from '@store/fileStore';
import { FileItem } from '@/types/index';

interface MoveModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string | null;
}

export const MoveModal = ({ isOpen, onClose, itemId }: MoveModalProps) => {
  const { items, moveItem, currentFolder } = useFileStore();
  const [selectedFolder, setSelectedFolder] = useState<string | null>(currentFolder);

  const availableFolders = items.filter(
    (item) => item.type === 'folder' && item.id !== itemId
  );

  const getBreadcrumbs = (folderId: string | null): FileItem[] => {
    const breadcrumbs: FileItem[] = [];
    let currentId = folderId;
    
    while (currentId) {
      const folder = items.find((i) => i.id === currentId);
      if (folder) {
        breadcrumbs.unshift(folder);
        currentId = folder.parentId;
      } else {
        break;
      }
    }
    
    return breadcrumbs;
  };

  const currentBreadcrumbs = getBreadcrumbs(selectedFolder);

  const handleMove = () => {
    if (itemId) {
      moveItem(itemId, selectedFolder);
    }
    onClose();
  };

  const handleClose = () => {
    setSelectedFolder(currentFolder);
    onClose();
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
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
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
              
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.15))',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    <MoveRight 
                      className="w-5 h-5"
                      style={{ color: 'var(--accent-primary)' }}
                    />
                  </div>
                  
                  <h2 
                    className="text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Move to Folder
                  </h2>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
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

              {/* Breadcrumbs */}
              
              <div className="mb-4">
                <div 
                  className="flex items-center gap-1 text-sm flex-wrap p-3 rounded-xl"
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-default)',
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedFolder(null)}
                    className="flex items-center gap-1 transition-all duration-200"
                    style={{
                      color: selectedFolder === null 
                        ? 'var(--accent-primary)' 
                        : 'var(--text-tertiary)',
                      fontWeight: selectedFolder === null ? '600' : '400',
                    }}
                  >
                    <Home className="w-3.5 h-3.5" />
                    Home
                  </motion.button>
                  
                  {currentBreadcrumbs.map((item) => (
                    <span key={item.id} className="flex items-center gap-1">
                      <ChevronRight 
                        className="w-3.5 h-3.5"
                        style={{ color: 'var(--text-muted)' }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedFolder(item.id)}
                        className="transition-all duration-200"
                        style={{
                          color: selectedFolder === item.id
                            ? 'var(--accent-primary)'
                            : 'var(--text-tertiary)',
                          fontWeight: selectedFolder === item.id ? '600' : '400',
                        }}
                      >
                        {item.name}
                      </motion.button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Folder List */}
              
              <div
                className="mb-5 rounded-xl overflow-hidden"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-default)',
                  maxHeight: '280px',
                  overflowY: 'auto',
                }}
              >
                {/* Home Option */}
                <motion.button
                  whileHover={{ backgroundColor: 'var(--bg-elevated)' }}
                  onClick={() => setSelectedFolder(null)}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 transition-all duration-200"
                  style={{
                    background: selectedFolder === null
                      ? 'rgba(139, 92, 246, 0.1)'
                      : 'transparent',
                    borderLeft: selectedFolder === null
                      ? '3px solid var(--accent-primary)'
                      : '3px solid transparent',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: selectedFolder === null
                        ? 'rgba(139, 92, 246, 0.2)'
                        : 'var(--bg-elevated)',
                      border: selectedFolder === null
                        ? '1px solid rgba(139, 92, 246, 0.3)'
                        : '1px solid var(--border-default)',
                    }}
                  >
                    <Home 
                      className="w-4 h-4"
                      style={{
                        color: selectedFolder === null
                          ? 'var(--accent-primary)'
                          : 'var(--text-tertiary)',
                      }}
                    />
                  </div>
                  
                  <span
                    className="font-medium transition-colors duration-200"
                    style={{
                      color: selectedFolder === null
                        ? 'var(--text-primary)'
                        : 'var(--text-secondary)',
                    }}
                  >
                    Home
                  </span>
                  
                  {selectedFolder === null && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 rounded-full"
                      style={{ background: 'var(--accent-primary)' }}
                    />
                  )}
                </motion.button>

                {/* Folders */}
                <div 
                  className="divide-y"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  {availableFolders.map((folder, index) => (
                    <motion.button
                      key={folder.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ backgroundColor: 'var(--bg-elevated)' }}
                      onClick={() => setSelectedFolder(folder.id)}
                      className="w-full text-left px-4 py-3 flex items-center gap-3 transition-all duration-200"
                      style={{
                        background: selectedFolder === folder.id
                          ? 'rgba(139, 92, 246, 0.1)'
                          : 'transparent',
                        borderLeft: selectedFolder === folder.id
                          ? '3px solid var(--accent-primary)'
                          : '3px solid transparent',
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          background: selectedFolder === folder.id
                            ? 'rgba(139, 92, 246, 0.2)'
                            : 'var(--bg-elevated)',
                          border: selectedFolder === folder.id
                            ? '1px solid rgba(139, 92, 246, 0.3)'
                            : '1px solid var(--border-default)',
                        }}
                      >
                        <Folder 
                          className="w-4 h-4"
                          style={{
                            color: selectedFolder === folder.id
                              ? 'var(--accent-primary)'
                              : 'var(--text-tertiary)',
                          }}
                        />
                      </div>
                      
                      <span
                        className="font-medium transition-colors duration-200 flex-1 truncate"
                        style={{
                          color: selectedFolder === folder.id
                            ? 'var(--text-primary)'
                            : 'var(--text-secondary)',
                        }}
                      >
                        {folder.name}
                      </span>
                      
                      {selectedFolder === folder.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full"
                          style={{ background: 'var(--accent-primary)' }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              
              <div className="flex gap-3 justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200"
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
                  Cancel
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMove}
                  className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-primary), #7c3aed)',
                    color: 'white',
                    boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <MoveRight className="w-4 h-4" />
                  Move Here
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
