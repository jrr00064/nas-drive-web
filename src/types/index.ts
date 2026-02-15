export type FileType = 'folder' | 'image' | 'video' | 'audio' | 'document' | 'archive' | 'code' | 'other';

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: number;
  parentId: string | null;
  createdAt: string;
  modifiedAt: string;
  extension?: string;
}

export type ViewMode = 'grid' | 'list';

export interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  item: FileItem | null;
}

export interface StorageStats {
  total: number;
  used: number;
  available: number;
}
