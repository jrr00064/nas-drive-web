import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Folder, ChevronRight } from 'lucide-react';
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleClose}
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
                  Move to Folder
                </h2>
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-2 flex-wrap">
                  <button
                    onClick={() => setSelectedFolder(null)}
                    className={`hover:underline ${
                      selectedFolder === null
                        ? 'text-blue-500 font-medium'
                        : ''
                    }`}
                  >
                    Home
                  </button>
                  {currentBreadcrumbs.map((item) => (
                    <span key={item.id} className="flex items-center gap-1">
                      <ChevronRight className="w-4 h-4" />
                      <button
                        onClick={() => setSelectedFolder(item.id)}
                        className="hover:underline"
                      >
                        {item.name}
                      </button>
                    </span>
                  ))}
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg max-h-60 overflow-y-auto">
                  <button
                    onClick={() => setSelectedFolder(null)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                      selectedFolder === null
                        ? 'bg-blue-50 dark:bg-blue-900/30'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Folder className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-900 dark:text-white">Home</span>
                  </button>

                  {availableFolders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => setSelectedFolder(folder.id)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                        selectedFolder === folder.id
                          ? 'bg-blue-50 dark:bg-blue-900/30'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Folder className="w-5 h-5 text-blue-500 ml-4" />
                      <span className="text-gray-900 dark:text-white truncate">{folder.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleMove}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  Move
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
