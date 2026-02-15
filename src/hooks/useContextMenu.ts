import { useEffect, useCallback } from 'react';
import { useFileStore } from '@store/fileStore';
import { FileItem } from '@/types/index';

export const useContextMenu = () => {
  const { contextMenu, showContextMenu, hideContextMenu } = useFileStore();

  const handleContextMenu = useCallback(
    (e: React.MouseEvent, item: FileItem | null) => {
      e.preventDefault();
      showContextMenu(e.clientX, e.clientY, item);
    },
    [showContextMenu]
  );

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (contextMenu.visible) {
        const target = e.target as HTMLElement;
        if (!target.closest('[data-context-menu]')) {
          hideContextMenu();
        }
      }
    },
    [contextMenu.visible, hideContextMenu]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return {
    isVisible: contextMenu.visible,
    x: contextMenu.x,
    y: contextMenu.y,
    item: contextMenu.item,
    handleContextMenu,
    hideContextMenu,
  };
};
