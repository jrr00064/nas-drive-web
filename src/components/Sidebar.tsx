import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Folder,
  Image,
  Video,
  FileText,
  Archive,
  Home,
  Cloud,
  HardDrive,
  ChevronLeft,
  ChevronRight,
  X,
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
        initial={{ x: -240, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col h-full relative"
        style={{
          width: isCollapsed ? '64px' : '240px',
          background: '#141416',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Logo */}
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#7c3aed' }}>
              <Cloud className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-semibold text-lg text-white">NAS Drive</h1>
                <p className="text-xs text-zinc-500">Cloud Storage</p>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2">
          <div className="space-y-0.5">
            {categories.map((category) => {
              const Icon = categoryIcons[category];
              const isActive = category === 'home' ? currentFolder === null : false;
              
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                  style={{
                    background: isActive ? '#2a2a2e' : 'transparent',
                    color: isActive ? '#fafafa' : '#a1a1aa',
                  }}
                  title={isCollapsed ? categoryLabels[category] : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" style={{ color: isActive ? '#8b5cf6' : '#71717a' }} />
                  {!isCollapsed && <span className="text-sm font-medium">{categoryLabels[category]}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Stats */}
        {!isCollapsed && (
          <div className="p-4 m-3 rounded-lg" style={{ background: '#1f1f22', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2 mb-2">
              <HardDrive className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-300">{totalItems} items</span>
            </div>
            <div className="flex gap-3 text-xs text-zinc-500">
              <span>{folderCount} folders</span>
              <span>{fileCount} files</span>
            </div>
          </div>
        )}

        {/* Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 rounded-full flex items-center justify-center text-zinc-500 bg-zinc-800 border border-zinc-700"
        >
          {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>

      {/* Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-sm p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">New Folder</h3>
              <button onClick={() => setIsCreating(false)} className="text-zinc-500 hover:text-zinc-300">
                <X className="w-5 h-5" />
              </button>
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
              className="w-full px-4 py-2 rounded-lg mb-4 bg-zinc-950 border border-zinc-800 text-white"
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setIsCreating(false)} className="px-4 py-2 rounded-lg text-sm text-zinc-400 bg-zinc-800">Cancel</button>
              <button onClick={handleCreateFolder} className="px-4 py-2 rounded-lg text-sm text-white bg-violet-600">Create</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
