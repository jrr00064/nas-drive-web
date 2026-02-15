import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Folder, AlertTriangle } from 'lucide-react';
import { useFileStore } from '@store/fileStore';
import { FileItem } from '@/types/index';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: FileItem | null;
}

export const DeleteModal = ({ isOpen, onClose, item }: DeleteModalProps) => {
  const { deleteItem } = useFileStore();

  const handleDelete = () => {
    if (item) {
      deleteItem(item.id);
    }
    onClose();
  };

  const getItemCount = () => {
    if (!item || item.type !== 'folder') return 0;
    const { items } = useFileStore.getState();
    return items.filter((i) => i.parentId === item.id).length;
  };

  const itemCount = getItemCount();

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
            style={{
              maxWidth: '400px',
            }}
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
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                    }}
                  >
                    <AlertTriangle 
                      className="w-5 h-5"
                      style={{ color: 'var(--accent-danger)' }}
                    />
                  </div>
                  
                  <h2 
                    className="text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Delete {item?.type === 'folder' ? 'Folder' : 'File'}
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

              {/* Content */}
              
              <div className="mb-6">
                <p 
                  className="text-sm mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Are you sure you want to delete{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>
                    {item?.name}
                  </strong>?
                </p>
                
                {item?.type === 'folder' && itemCount > 0 && (
                  <div
                    className="flex items-center gap-2 p-3 rounded-xl mb-3"
                    style={{
                      background: 'rgba(249, 115, 22, 0.1)',
                      border: '1px solid rgba(249, 115, 22, 0.2)',
                    }}
                  >
                    <Folder 
                      className="w-4 h-4"
                      style={{ color: 'var(--accent-warning)' }}
                    />
                    <p 
                      className="text-sm"
                      style={{ color: 'var(--accent-warning)' }}
                    >
                      This folder contains {itemCount} item{itemCount !== 1 ? 's' : ''} that will also be deleted.
                    </p>
                  </div>
                )}
                
                <div
                  className="flex items-center gap-2 p-3 rounded-xl"
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                  }}
                >
                  <Trash2 
                    className="w-4 h-4"
                    style={{ color: 'var(--accent-danger)' }}
                  />
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--accent-danger)' }}
                  >
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              {/* Actions */}
              
              <div className="flex gap-3 justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
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
                  onClick={handleDelete}
                  className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2"
                  style={{
                    background: 'rgba(239, 68, 68, 0.9)',
                    color: 'white',
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--accent-danger)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.9)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(239, 68, 68, 0.3)';
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
