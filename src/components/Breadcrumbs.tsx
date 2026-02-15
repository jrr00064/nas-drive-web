import { motion } from 'framer-motion';
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
      className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 flex-wrap"
    >
      <button
        onClick={() => navigateToFolder(null)}
        className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </button>

      {breadcrumbPath.map((folder, index) => (
        <span key={folder.id} className="flex items-center">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <button
            onClick={() => navigateToFolder(folder.id)}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
              index === breadcrumbPath.length - 1
                ? 'text-blue-600 dark:text-blue-400 font-medium'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Folder className="w-4 h-4" />
            <span className="truncate max-w-[120px] sm:max-w-[200px]">{folder.name}</span>
          </button>
        </span>
      ))}
    </motion.nav>
  );
};
