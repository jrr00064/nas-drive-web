import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronRight, Folder } from 'lucide-react';
import { useFileStore } from '@store/fileStore';
import { FileItem } from '@/types/index';

export const Breadcrumbs = () => {
  const { currentFolder, items, navigateToFolder } = useFileStore();

  const getBreadcrumbPath = (): FileItem[] => {
    const path: FileItem[] = [];
    let parentId = currentFolder;
    
    while (parentId) {
      const folder = items.find((i) => i.id === parentId);
      if (folder) {
        path.unshift(folder);
        parentId = folder.parentId;
      } else {
        break;
      }
    }
    
    return path;
  };

  const breadcrumbPath = getBreadcrumbPath();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex items-center gap-1 flex-wrap"
      style={{
        padding: '8px 16px',
        background: 'linear-gradient(145deg, rgba(26, 26, 29, 0.6), rgba(18, 18, 20, 0.8))',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        width: 'fit-content',
      }}
    >
      {/* Home Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigateToFolder(null)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200"
        style={{
          background: currentFolder === null 
            ? 'rgba(139, 92, 246, 0.15)'
            : 'transparent',
          color: currentFolder === null 
            ? 'var(--accent-primary)'
            : 'var(--text-tertiary)',
          border: currentFolder === null
            ? '1px solid rgba(139, 92, 246, 0.3)'
            : '1px solid transparent',
        }}
        onMouseEnter={(e) => {
          if (currentFolder !== null) {
            e.currentTarget.style.background = 'var(--bg-elevated)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }
        }}
        onMouseLeave={(e) => {
          if (currentFolder !== null) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-tertiary)';
          }
        }}
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline text-sm font-medium">Home</span>
      </motion.button>

      {/* Path Items */}
      <AnimatePresence mode="popLayout">
        {breadcrumbPath.map((folder, index) => {
          const isLast = index === breadcrumbPath.length - 1;
          
          return (
            <motion.span
              key={folder.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center"
            >
              <ChevronRight 
                className="w-4 h-4 mx-1"
                style={{ color: 'var(--text-muted)' }}
              />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateToFolder(folder.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 max-w-[150px] sm:max-w-[200px]"
                style={{
                  background: isLast 
                    ? 'rgba(139, 92, 246, 0.15)'
                    : 'transparent',
                  color: isLast 
                    ? 'var(--accent-primary)'
                    : 'var(--text-tertiary)',
                  border: isLast
                    ? '1px solid rgba(139, 92, 246, 0.3)'
                    : '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isLast) {
                    e.currentTarget.style.background = 'var(--bg-elevated)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLast) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-tertiary)';
                  }
                }}
              >
                <Folder className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium truncate">
                  {folder.name}
                </span>
              </motion.button>
            </motion.span>
          );
        })}
      </AnimatePresence>
    </motion.nav>
  );
};
