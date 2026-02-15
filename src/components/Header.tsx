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
  X,
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
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="h-16 px-6 flex items-center gap-4"
        style={{
          background: '#141416',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        {/* Left: Navigation */}
        <div className="flex items-center gap-2 shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={navigateBack}
            className="p-2.5 rounded-lg transition-all duration-200"
            style={{
              background: '#1f1f22',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#a1a1aa',
            }}
            title="Go back"
          >
            <ArrowLeftToLine className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={navigateUp}
            disabled={!currentFolder}
            className="p-2.5 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: '#1f1f22',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#a1a1aa',
            }}
            title="Go up"
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-lg text-sm"
              style={{
                background: '#1f1f22',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fafafa',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Actions Group */}
        <div className="flex items-center gap-2 shrink-0">
          {/* View Toggle */}
          <div
            className="flex items-center rounded-lg p-0.5"
            style={{
              background: '#1f1f22',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <button
              onClick={() => setViewMode('grid')}
              className="p-2 rounded transition-all"
              style={{
                background: viewMode === 'grid' ? '#2a2a2e' : 'transparent',
                color: viewMode === 'grid' ? '#8b5cf6' : '#71717a',
              }}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className="p-2 rounded transition-all"
              style={{
                background: viewMode === 'list' ? '#2a2a2e' : 'transparent',
                color: viewMode === 'list' ? '#8b5cf6' : '#71717a',
              }}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Actions */}
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: '#1f1f22',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#a1a1aa',
            }}
          >
            <FolderPlus className="w-4 h-4" />
            <span>New</span>
          </button>

          <button
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white"
            style={{
              background: '#7c3aed',
            }}
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-lg transition-all"
            style={{
              background: '#1f1f22',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: isDarkMode ? '#fbbf24' : '#a1a1aa',
            }}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </motion.header>

      {/* Create Folder Modal */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsCreating(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-sm p-6 rounded-2xl"
            style={{
              background: 'linear-gradient(145deg, rgba(26, 26, 29, 0.95), rgba(18, 18, 20, 0.98))',
              border: '1px solid var(--border-default)',
              boxShadow: 'var(--shadow-xl)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              New Folder
            </h3>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateFolder();
                if (e.key === 'Escape') setIsCreating(false);
              }}
              className="w-full px-4 py-3 rounded-xl mb-5 text-sm transition-all duration-200"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <div className="flex gap-3 justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsCreating(false)}
                className="px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)',
                }}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreateFolder}
                className="px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary), #7c3aed)',
                  color: 'white',
                  boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)',
                }}
              >
                Create
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
