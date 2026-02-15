import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FileItem, ViewMode, ContextMenuState, StorageStats } from '@/types/index';
import { DEMO_ITEMS, generateId } from '@utils/fileHelpers';

interface FileStore {
  items: FileItem[];
  currentFolder: string | null;
  viewMode: ViewMode;
  searchQuery: string;
  selectedItems: Set<string>;
  contextMenu: ContextMenuState;
  isDarkMode: boolean;
  folderHistory: string[];
  
  // Actions
  setItems: (items: FileItem[]) => void;
  addItem: (item: FileItem) => void;
  deleteItem: (id: string) => void;
  renameItem: (id: string, newName: string) => void;
  moveItem: (id: string, parentId: string | null) => void;
  navigateToFolder: (folderId: string | null) => void;
  navigateUp: () => void;
  navigateBack: () => void;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  toggleSelection: (id: string) => void;
  clearSelection: () => void;
  showContextMenu: (x: number, y: number, item: FileItem | null) => void;
  hideContextMenu: () => void;
  createFolder: (name: string) => void;
  getCurrentFolderItems: () => FileItem[];
  getBreadcrumbs: () => FileItem[];
  getStorageStats: () => StorageStats;
  toggleDarkMode: () => void;
}

const STORAGE_LIMIT = 1 * 1024 * 1024 * 1024 * 1024; // 1TB

export const useFileStore = create<FileStore>()(
  persist(
    (set, get) => ({
      items: DEMO_ITEMS,
      currentFolder: null,
      viewMode: 'grid',
      searchQuery: '',
      selectedItems: new Set(),
      contextMenu: { visible: false, x: 0, y: 0, item: null },
      isDarkMode: false,
      folderHistory: [],

      setItems: (items) => set({ items }),
      
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      
      deleteItem: (id) => {
        set((state) => {
          const itemToDelete = state.items.find((i) => i.id === id);
          if (!itemToDelete) return state;
          
          let newItems = state.items.filter((i) => i.id !== id);
          
          // If deleting a folder, also delete children
          if (itemToDelete.type === 'folder') {
            const childrenIds = new Set<string>();
            const collectChildren = (parentId: string) => {
              newItems.forEach((item) => {
                if (item.parentId === parentId) {
                  childrenIds.add(item.id);
                  if (item.type === 'folder') {
                    collectChildren(item.id);
                  }
                }
              });
            };
            collectChildren(id);
            newItems = newItems.filter((i) => !childrenIds.has(i.id));
          }
          
          return { items: newItems };
        });
      },
      
      renameItem: (id, newName) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, name: newName, modifiedAt: new Date().toISOString() }
              : item
          ),
        }));
      },
      
      moveItem: (id, parentId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, parentId, modifiedAt: new Date().toISOString() }
              : item
          ),
        }));
      },
      
      navigateToFolder: (folderId) => {
        set((state) => ({
          currentFolder: folderId,
          folderHistory: [...state.folderHistory, state.currentFolder ?? 'root'],
          searchQuery: '',
        }));
      },
      
      navigateUp: () => {
        const state = get();
        if (state.currentFolder) {
          const currentItem = state.items.find((i) => i.id === state.currentFolder);
          const parentId = currentItem?.parentId ?? null;
          set({ currentFolder: parentId });
        }
      },
      
      navigateBack: () => {
        set((state) => {
          if (state.folderHistory.length === 0) return state;
          const newHistory = [...state.folderHistory];
          const previousFolder = newHistory.pop();
          return {
            currentFolder: previousFolder === 'root' ? null : previousFolder ?? null,
            folderHistory: newHistory,
          };
        });
      },
      
      setViewMode: (mode) => set({ viewMode: mode }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      toggleSelection: (id) => {
        set((state) => {
          const newSet = new Set(state.selectedItems);
          if (newSet.has(id)) {
            newSet.delete(id);
          } else {
            newSet.add(id);
          }
          return { selectedItems: newSet };
        });
      },
      
      clearSelection: () => set({ selectedItems: new Set() }),
      
      showContextMenu: (x, y, item) => set({ contextMenu: { visible: true, x, y, item } }),
      
      hideContextMenu: () => set({ contextMenu: { visible: false, x: 0, y: 0, item: null } }),
      
      createFolder: (name) => {
        const state = get();
        const newFolder: FileItem = {
          id: generateId(),
          name,
          type: 'folder',
          size: 0,
          parentId: state.currentFolder,
          createdAt: new Date().toISOString(),
          modifiedAt: new Date().toISOString(),
        };
        set((state) => ({ items: [...state.items, newFolder] }));
      },
      
      getCurrentFolderItems: () => {
        const state = get();
        return state.items.filter((item) => item.parentId === state.currentFolder);
      },
      
      getBreadcrumbs: () => {
        const state = get();
        const breadcrumbs: FileItem[] = [];
        let currentId: string | null = state.currentFolder;
        
        while (currentId) {
          const folder = state.items.find((i) => i.id === currentId);
          if (folder) {
            breadcrumbs.unshift(folder);
            currentId = folder.parentId;
          } else {
            break;
          }
        }
        
        return breadcrumbs;
      },
      
      getStorageStats: () => {
        const state = get();
        const used = state.items.reduce((sum, item) => sum + item.size, 0);
        return {
          total: STORAGE_LIMIT,
          used,
          available: STORAGE_LIMIT - used,
        };
      },
      
      toggleDarkMode: () => set((state) => ({
        isDarkMode: !state.isDarkMode,
      })),
    }),
    {
      name: 'nas-drive-storage',
      partialize: (state) => ({
        items: state.items,
        viewMode: state.viewMode,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);
