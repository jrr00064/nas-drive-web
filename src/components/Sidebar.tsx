import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Folder,
  Image,
  Video,
  FileText,
  Archive,
  Home,
  Plus,
  X,
  Cloud,
  HardDrive,
} from 'lucide-react';
import { useFileStore } from '@store/fileStore';
import { FileType } from '@/types/index';

const categoryIcons: Record<FileType | 'home', React.ElementType> = {
  home: Home,
  folder: Folder,
  image: Image,
  video: Video,
  audio: FileText,
  document: FileText,
  archive: Archive,
  code: FileText,
  other: FileText,
};

const categoryLabels: Record<FileType | 'home', string> = {
  home: 'Home',
  folder: 'All Files',
  image: 'Images',
  video: 'Videos',
  audio: 'Audio',
  document: 'Documents',
  archive: 'Archives',
  code: 'Code Files',
  other: 'Other',
};

export const Sidebar = () => {
  const { navigateToFolder, currentFolder, createFolder, items } = useFileStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const categories: (FileType | 'home')[] = ['home', 'folder', 'image', 'video', 'document', 'archive'];

  const handleCategoryClick = (category: FileType | 'home') => {
    navigateToFolder(category === 'home' ? null : (category === 'folder' ? null : null));
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim());
      setNewFolderName('');
      setIsCreating(false);
    }
  };

  const totalItems = items.length;
  const folderCount = items.filter((i) => i.type === 'folder').length;
  const fileCount = totalItems - folderCount;

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 ${
        isCollapsed ? 'w-16' : 'w-64'
      } transition-all duration-300 flex flex-col h-full`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-xl text-gray-900 dark:text-white">NAS Drive</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Cloud Storage</p>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button
            onClick={() => setIsCreating(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>New Folder</span>
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {categories.map((category) => {
          const Icon = categoryIcons[category];
          const isActive = category === 'home' ? currentFolder === null : false;
          
          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title={isCollapsed ? categoryLabels[category] : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span className="font-medium">{categoryLabels[category]}</span>}
            </button>
          );
        })}
      </nav>

      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
            <HardDrive className="w-4 h-4" />
            <span>{totalItems} items</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            {folderCount} folders, {fileCount} files
          </div>
        </div>
      )}

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute bottom-4 right-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
      >
        <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>

      {isCreating && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-80">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">New Folder</h3>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateFolder();
                if (e.key === 'Escape') setIsCreating(false);
              }}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.aside>
  );
};
