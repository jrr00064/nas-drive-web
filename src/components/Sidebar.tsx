import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronLeft,
  ChevronRight,
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
    <>
      <motion.aside
        initial={{ x: -280, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="flex flex-col h-full relative"
        style={{
          width: isCollapsed ? '80px' : '280px',
          background: 'linear-gradient(180deg, rgba(18, 18, 20, 0.98), rgba(10, 10, 11, 0.98))',
          borderRight: '1px solid var(--border-default)',
          transition: 'width 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        {/* Logo Section */}
        <div 
          className="p-5"
          style={{ borderBottom: '1px solid var(--border-default)' }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)',
              }}
            >
              <Cloud className="w-6 h-6 text-white" />
            </motion.div>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 
                    className="font-bold text-xl tracking-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    NAS Drive
                  </h1>
                  <p 
                    className="text-xs"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    Cloud Storage
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* New Folder Button */}
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsCreating(true)}
                className="w-full mt-5 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary), #7c3aed)',
                  color: 'white',
                  boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)',
                }}
              >
                <Plus className="w-4 h-4" />
                <span>New Folder</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {categories.map((category, index) => {
              const Icon = categoryIcons[category];
              const isActive = category === 'home' ? currentFolder === null : false;
              
              return (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategoryClick(category)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group"
                  style={{
                    background: isActive ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.1))' : 'transparent',
                    border: isActive ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
                  }}
                  title={isCollapsed ? categoryLabels[category] : undefined}
                >
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? '' : 'bg-opacity-10'}`}
                    style={{
                      background: isActive 
                        ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.15))'
                        : 'var(--bg-elevated)',
                      border: isActive 
                        ? '1px solid rgba(139, 92, 246, 0.3)'
                        : '1px solid var(--border-default)',
                    }}
                  >
                    <Icon 
                      className="w-4 h-4 shrink-0 transition-colors duration-200" 
                      style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-tertiary)' }}
                    />
                  </motion.div>
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="font-medium text-sm transition-colors duration-200"
                        style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                      >
                        {categoryLabels[category]}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* Storage Stats */}
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="p-4 m-4 rounded-2xl"
              style={{
                background: 'linear-gradient(145deg, rgba(26, 26, 29, 0.8), rgba(18, 18, 20, 0.9))',
                border: '1px solid var(--border-default)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.15))',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                  }}
                >
                  <HardDrive 
                    className="w-5 h-5" 
                    style={{ color: 'var(--accent-primary)' }}
                  />
                </div>
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                    {totalItems} items
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {folderCount} folders, {fileCount} files
                  </p>
                </div>
              </div>
              
              {/* Mini Storage Bar */}
              <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(folderCount / (totalItems || 1)) * 100}%` }}
                  className="absolute h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)',
            color: 'var(--text-tertiary)',
            boxShadow: 'var(--shadow-md)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-hover)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-default)';
            e.currentTarget.style.color = 'var(--text-tertiary)';
          }}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </motion.button>
      </motion.aside>

      {/* Create Folder Modal */}
      <AnimatePresence>
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
              <div className="flex items-center justify-between mb-5">
                <h3 
                  className="text-lg font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  New Folder
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCreating(false)}
                  className="p-1 rounded-full transition-all duration-200"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              
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
                  className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200"
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
                  className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200"
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
      </AnimatePresence>
    </>
  );
};
