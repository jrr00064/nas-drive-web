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
        className="h-16 px-6 flex items-center justify-between gap-4"
        style={{
          background: 'linear-gradient(180deg, rgba(18, 18, 20, 0.95), rgba(18, 18, 20, 0.8))',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-default)',
        }}
      >
        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={navigateBack}
            className="p-2.5 rounded-xl transition-all duration-200"
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
            title="Go back"
          >
            <ArrowLeftToLine className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={navigateUp}
            disabled={!currentFolder}
            className="p-2.5 rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={(e) => {
              if (!currentFolder) return;
              e.currentTarget.style.background = 'var(--bg-hover)';
              e.currentTarget.style.borderColor = 'var(--border-hover)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-elevated)';
              e.currentTarget.style.borderColor = 'var(--border-default)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
            title="Go up"
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Search 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200" 
              style={{ color: 'var(--text-tertiary)' }}
            />
            <input
              type="text"
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-2.5 rounded-xl text-sm transition-all duration-200"
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
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-200"
                style={{
                  color: 'var(--text-tertiary)',
                  background: 'var(--bg-elevated)',
                }}
                whileHover={{ scale: 1.1, background: 'var(--bg-hover)' }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-3 h-3" />
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* New Folder Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200"
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
            <FolderPlus className="w-4 h-4" />
            <span className="hidden sm:inline">New Folder</span>
          </motion.button>

          {/* Upload Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200"
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
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
          </motion.button>

          {/* Divider */}
          <div 
            className="w-px h-6 mx-1" 
            style={{ background: 'var(--border-default)' }}
          />

          {/* View Mode Toggle */}
          <div
            className="flex items-center rounded-xl p-1"
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-default)',
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('grid')}
              className="p-2 rounded-lg transition-all duration-200"
              style={{
                background: viewMode === 'grid' ? 'var(--bg-elevated)' : 'transparent',
                color: viewMode === 'grid' ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none',
              }}
              title="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('list')}
              className="p-2 rounded-lg transition-all duration-200"
              style={{
                background: viewMode === 'list' ? 'var(--bg-elevated)' : 'transparent',
                color: viewMode === 'list' ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                boxShadow: viewMode === 'list' ? 'var(--shadow-sm)' : 'none',
              }}
              title="List view"
            >
              <List className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: isDarkMode ? 180 : 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl transition-all duration-200"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              color: isDarkMode ? '#fbbf24' : 'var(--text-secondary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-hover)';
              e.currentTarget.style.borderColor = 'var(--border-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-elevated)';
              e.currentTarget.style.borderColor = 'var(--border-default)';
            }}
            title={isDarkMode ? 'Light mode' : 'Dark mode'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </motion.button>
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
