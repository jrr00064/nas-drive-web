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

  const handleProperties = () => {
    if (item) {
      setModalState((prev) => ({
        ...prev,
        properties: { isOpen: true, item },
      }));
    }
  };

  useEffect(() => {
    const handleGlobalClick = () => {
      hideMenu();
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [hideMenu]);

  return (
    <div 
      className="flex h-screen overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <div 
          className="flex-1 overflow-auto"
          style={{ background: 'var(--bg-primary)' }}
        >
          <div className="max-w-7xl mx-auto p-6">
            {/* Breadcrumbs */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <Breadcrumbs />
            </motion.div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
              {filteredItems.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center py-24"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-28 h-28 rounded-3xl flex items-center justify-center mb-6"
                    style={{
                      background: 'linear-gradient(145deg, rgba(26, 26, 29, 0.8), rgba(18, 18, 20, 0.9))',
                      border: '1px solid var(--border-default)',
                      boxShadow: 'var(--shadow-lg)',
                    }}
                  >
                    {searchQuery ? (
                      <Search 
                        className="w-12 h-12" 
                        style={{ color: 'var(--text-muted)' }}
                      />
                    ) : (
                      <FolderOpen 
                        className="w-12 h-12" 
                        style={{ color: 'var(--text-muted)' }}
                      />
                    )}
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg font-medium mb-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {searchQuery ? (
                      <>
                        No results for "<span style={{ color: 'var(--accent-primary)' }}>{searchQuery}</span>"
                      </>
                    ) : (
                      'This folder is empty'
                    )}
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {searchQuery 
                      ? 'Try different keywords or clear your search'
                      : 'Add files or folders to get started'
                    }
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
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

            {/* Storage Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10"
            >
              <StorageBar />
            </motion.div>
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
        onProperties={handleProperties}
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
