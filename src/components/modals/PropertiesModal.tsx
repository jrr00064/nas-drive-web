import { motion, AnimatePresence } from 'framer-motion';
import { X, File, Folder, Calendar, HardDrive, FileType2 } from 'lucide-react';
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
    { label: 'Name', value: item.name, icon: item.type === 'folder' ? Folder : File },
    { label: 'Type', value: item.type === 'folder' ? 'Folder' : `${getFileExtension(item.name).toUpperCase() || 'File'} file`, icon: FileType2 },
    { label: 'Size', value: item.size > 0 ? formatFileSize(item.size) : '—', icon: HardDrive },
    { label: 'Created', value: formatDate(item.createdAt), icon: Calendar },
    { label: 'Modified', value: formatDate(item.modifiedAt), icon: Calendar },
    { label: 'Location', value: item.parentId ? 'Inside folder' : 'Root', icon: Folder },
  ];

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
                  Properties
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center py-6">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                    {item.type === 'folder' ? (
                      <Folder className="w-8 h-8 text-blue-500" />
                    ) : (
                      <File className="w-8 h-8 text-blue-500" />
                    )}
                  </div>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {properties.map((prop) => (
                    <div key={prop.label} className="py-3 flex items-start gap-3">
                      <prop.icon className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">{prop.label}</span>
                        <span className="text-gray-900 dark:text-white block">{prop.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
