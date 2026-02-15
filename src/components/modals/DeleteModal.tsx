import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Folder } from 'lucide-react';
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Delete {item?.type === 'folder' ? 'Folder' : 'File'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full shrink-0">
                  <Trash2 className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Are you sure you want to delete <strong className="text-gray-900 dark:text-white">{item?.name}</strong>?
                  </p>
                  {item?.type === 'folder' && itemCount > 0 && (
                    <p className="text-sm text-orange-600 dark:text-orange-400 flex items-center gap-1">
                      <Folder className="w-4 h-4" />
                      This folder contains {itemCount} item{itemCount !== 1 ? 's' : ''} that will also be deleted.
                    </p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
