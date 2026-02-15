import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { FileGrid } from './FileGrid';
import { FileList } from './FileList';
import { ContextMenu } from './ContextMenu';
import { StorageBar } from './StorageBar';
import { Breadcrumbs } from './Breadcrumbs';
import { RenameModal } from './modals/RenameModal';
import { MoveModal } from './modals/MoveModal';
import { DeleteModal } from './modals/DeleteModal';
import { PropertiesModal } from './modals/PropertiesModal';
import { useFileStore } from '@store/fileStore';
import { useContextMenu } from '@hooks/useContextMenu';
import { FileItem } from '@/types/index';
import { FolderOpen, Search } from 'lucide-react';

export const MainLayout = () => {
  const {
    viewMode,
    searchQuery,
    navigateToFolder,
    getCurrentFolderItems,
    clearSelection,
  } = useFileStore();

  const [modalState, setModalState] = useState<{
    rename: { isOpen: boolean; item: FileItem | null };
    move: { isOpen: boolean; item: FileItem | null };
    delete: { isOpen: boolean; item: FileItem | null };
    properties: { isOpen: boolean; item: FileItem | null };
  }>({
    rename: { isOpen: false, item: null },
    move: { isOpen: false, item: null },
    delete: { isOpen: false, item: null },
    properties: { isOpen: false, item: null },
  });

  const { isVisible, item, hideContextMenu: hideMenu } = useContextMenu();

  const currentItems = getCurrentFolderItems();

  const filteredItems = searchQuery
    ? currentItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentItems;

  const handleItemClick = (_clickedItem: FileItem) => {
    clearSelection();
  };

  const handleItemDoubleClick = (clickedItem: FileItem) => {
    if (clickedItem.type === 'folder') {
      navigateToFolder(clickedItem.id);
    } else {
      // Open file - would typically open a preview or download
      console.log('Opening file:', clickedItem.name);
    }
  };

  const handleOpenItem = () => {
    if (item?.type === 'folder') {
      navigateToFolder(item.id);
    }
  };

  const handleRename = () => {
    if (item) {
      setModalState((prev) => ({
        ...prev,
        rename: { isOpen: true, item },
      }));
    }
  };

  const handleMove = () => {
    if (item) {
      setModalState((prev) => ({
        ...prev,
        move: { isOpen: true, item },
      }));
    }
  };

  const handleDelete = () => {
    if (item) {
      setModalState((prev) => ({
        ...prev,
        delete: { isOpen: true, item },
      }));
    }
  };

  // Context menu is handled by individual file items
  useEffect(() => {
    const handleGlobalClick = () => {
      hideMenu();
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [hideMenu]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <Breadcrumbs />
            </div>

            <AnimatePresence mode="wait">
              {filteredItems.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center py-20"
                >
                  {searchQuery ? (
                    <>
                      <Search className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
                      <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">
                        No results for "{searchQuery}"
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        Try different keywords or clear your search
                      </p>
                    </>
                  ) : (
                    <>
                      <FolderOpen className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
                      <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">
                        This folder is empty
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        Add files or folders to get started
                      </p>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {viewMode === 'grid' ? (
                    <FileGrid
                      items={filteredItems}
                      onItemClick={handleItemClick}
                      onItemDoubleClick={handleItemDoubleClick}
                    />
                  ) : (
                    <FileList
                      items={filteredItems}
                      onItemClick={handleItemClick}
                      onItemDoubleClick={handleItemDoubleClick}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8">
              <StorageBar />
            </div>
          </div>
        </div>
      </div>

      <ContextMenu
        isOpen={isVisible}
        onClose={hideMenu}
        item={item}
        onOpen={handleOpenItem}
        onRename={handleRename}
        onMove={handleMove}
        onDelete={handleDelete}
      />

      <RenameModal
        isOpen={modalState.rename.isOpen}
        onClose={() =>
          setModalState((prev) => ({
            ...prev,
            rename: { isOpen: false, item: null },
          }))
        }
        itemId={modalState.rename.item?.id || null}
        itemName={modalState.rename.item?.name || ''}
      />

      <MoveModal
        isOpen={modalState.move.isOpen}
        onClose={() =>
          setModalState((prev) => ({
            ...prev,
            move: { isOpen: false, item: null },
          }))
        }
        itemId={modalState.move.item?.id || null}
      />

      <DeleteModal
        isOpen={modalState.delete.isOpen}
        onClose={() =>
          setModalState((prev) => ({
            ...prev,
            delete: { isOpen: false, item: null },
          }))
        }
        item={modalState.delete.item}
      />

      <PropertiesModal
        isOpen={modalState.properties.isOpen}
        onClose={() =>
          setModalState((prev) => ({
            ...prev,
            properties: { isOpen: false, item: null },
          }))
        }
        item={modalState.properties.item}
      />
    </div>
  );
};
