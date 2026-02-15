import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Grid3X3,
  List,
  ArrowLeft,
  ArrowLeftToLine,
  Moon,
  Sun,
  FolderPlus,
  Upload,
} from 'lucide-react';
import { useFileStore } from '@store/fileStore';

export const Header = () => {
  const {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    currentFolder,
    navigateUp,
    navigateBack,
    toggleDarkMode,
    isDarkMode,
    createFolder,
  } = useFileStore();

  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim());
      setNewFolderName('');
      setIsCreating(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-2">
        <button
          onClick={navigateBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          title="Go back"
        >
          <ArrowLeftToLine className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          onClick={navigateUp}
          disabled={!currentFolder}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Go up"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search files and folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 rounded-lg text-gray-900 dark:text-white outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <FolderPlus className="w-4 h-4" />
          <span className="hidden sm:inline">New Folder</span>
        </button>

        <button
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Upload</span>
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />

        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
            }`}
            title="Grid view"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
            }`}
            title="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          title={isDarkMode ? 'Light mode' : 'Dark mode'}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {isCreating && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        >
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
    </motion.header>
  );
};
