import { FileItem, FileType } from '@/types/index';

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getFileExtension = (filename: string): string => {
  const match = filename.match(/\.([^.]+)$/);
  return match ? match[1].toLowerCase() : '';
};

export const getFileType = (name: string): FileType => {
  if (!name.includes('.')) return 'folder';
  const ext = getFileExtension(name);
  
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'ico'];
  const videoExts = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'];
  const audioExts = ['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma', 'm4a'];
  const docExts = ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'xls', 'xlsx', 'ppt', 'pptx', 'csv'];
  const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'];
  const codeExts = ['js', 'ts', 'jsx', 'tsx', 'html', 'css', 'json', 'xml', 'py', 'java', 'cpp', 'c', 'h', 'go', 'rs', 'php'];
  
  if (imageExts.includes(ext)) return 'image';
  if (videoExts.includes(ext)) return 'video';
  if (audioExts.includes(ext)) return 'audio';
  if (docExts.includes(ext)) return 'document';
  if (archiveExts.includes(ext)) return 'archive';
  if (codeExts.includes(ext)) return 'code';
  return 'other';
};

export const getFileIconColor = (type: FileType): string => {
  switch (type) {
    case 'folder': return 'text-blue-500';
    case 'image': return 'text-purple-500';
    case 'video': return 'text-red-500';
    case 'audio': return 'text-pink-500';
    case 'document': return 'text-orange-500';
    case 'archive': return 'text-yellow-500';
    case 'code': return 'text-green-500';
    default: return 'text-gray-500';
  }
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const DEMO_ITEMS: FileItem[] = [
  // Root folders
  { id: 'folder-1', name: 'Documents', type: 'folder', size: 0, parentId: null, createdAt: '2024-01-15T08:30:00Z', modifiedAt: '2024-02-10T14:20:00Z' },
  { id: 'folder-2', name: 'Images', type: 'folder', size: 0, parentId: null, createdAt: '2024-01-16T09:15:00Z', modifiedAt: '2024-02-12T11:45:00Z' },
  { id: 'folder-3', name: 'Videos', type: 'folder', size: 0, parentId: null, createdAt: '2024-01-17T10:00:00Z', modifiedAt: '2024-02-08T16:30:00Z' },
  { id: 'folder-4', name: 'Projects', type: 'folder', size: 0, parentId: null, createdAt: '2024-01-18T11:30:00Z', modifiedAt: '2024-02-15T09:00:00Z' },
  
  // Root files
  { id: 'file-1', name: 'README.txt', type: 'document', size: 2048, parentId: null, createdAt: '2024-01-15T08:35:00Z', modifiedAt: '2024-02-14T10:15:00Z', extension: 'txt' },
  { id: 'file-2', name: 'todo-list.pdf', type: 'document', size: 154320, parentId: null, createdAt: '2024-01-20T13:45:00Z', modifiedAt: '2024-02-10T15:30:00Z', extension: 'pdf' },
  { id: 'file-3', name: 'backup.zip', type: 'archive', size: 52428800, parentId: null, createdAt: '2024-02-01T00:00:00Z', modifiedAt: '2024-02-15T00:00:00Z', extension: 'zip' },
  
  // Documents folder contents
  { id: 'folder-1-1', name: 'Work', type: 'folder', size: 0, parentId: 'folder-1', createdAt: '2024-01-15T08:40:00Z', modifiedAt: '2024-02-05T11:00:00Z' },
  { id: 'folder-1-2', name: 'Personal', type: 'folder', size: 0, parentId: 'folder-1', createdAt: '2024-01-15T08:45:00Z', modifiedAt: '2024-02-12T09:20:00Z' },
  { id: 'file-1-1', name: 'report-2024.docx', type: 'document', size: 2548000, parentId: 'folder-1', createdAt: '2024-01-20T09:00:00Z', modifiedAt: '2024-02-14T16:45:00Z', extension: 'docx' },
  { id: 'file-1-2', name: 'budget-2024.xlsx', type: 'document', size: 452000, parentId: 'folder-1', createdAt: '2024-01-25T10:30:00Z', modifiedAt: '2024-02-13T14:00:00Z', extension: 'xlsx' },
  { id: 'file-1-3', name: 'meeting-notes.pdf', type: 'document', size: 892000, parentId: 'folder-1', createdAt: '2024-02-01T15:00:00Z', modifiedAt: '2024-02-01T15:00:00Z', extension: 'pdf' },
  
  // Images folder contents
  { id: 'folder-2-1', name: 'Vacation', type: 'folder', size: 0, parentId: 'folder-2', createdAt: '2024-01-16T09:20:00Z', modifiedAt: '2024-02-10T12:00:00Z' },
  { id: 'folder-2-2', name: 'Screenshots', type: 'folder', size: 0, parentId: 'folder-2', createdAt: '2024-01-16T09:25:00Z', modifiedAt: '2024-02-14T10:30:00Z' },
  { id: 'file-2-1', name: 'profile-picture.jpg', type: 'image', size: 524288, parentId: 'folder-2', createdAt: '2024-01-16T09:30:00Z', modifiedAt: '2024-01-16T09:30:00Z', extension: 'jpg' },
  { id: 'file-2-2', name: 'banner.png', type: 'image', size: 1048576, parentId: 'folder-2', createdAt: '2024-01-18T14:00:00Z', modifiedAt: '2024-01-18T14:00:00Z', extension: 'png' },
  { id: 'file-2-3', name: 'logo.svg', type: 'image', size: 16384, parentId: 'folder-2', createdAt: '2024-01-20T11:00:00Z', modifiedAt: '2024-01-20T11:00:00Z', extension: 'svg' },
  { id: 'file-2-4', name: 'screenshot-001.png', type: 'image', size: 2097152, parentId: 'folder-2-2', createdAt: '2024-02-14T10:30:00Z', modifiedAt: '2024-02-14T10:30:00Z', extension: 'png' },
  { id: 'file-2-5', name: 'screenshot-002.png', type: 'image', size: 1835008, parentId: 'folder-2-2', createdAt: '2024-02-14T10:35:00Z', modifiedAt: '2024-02-14T10:35:00Z', extension: 'png' },
  
  // Videos folder contents
  { id: 'folder-3-1', name: 'Tutorials', type: 'folder', size: 0, parentId: 'folder-3', createdAt: '2024-01-17T10:15:00Z', modifiedAt: '2024-02-08T16:00:00Z' },
  { id: 'file-3-1', name: 'intro-video.mp4', type: 'video', size: 134217728, parentId: 'folder-3', createdAt: '2024-01-17T10:30:00Z', modifiedAt: '2024-01-17T10:30:00Z', extension: 'mp4' },
  { id: 'file-3-2', name: 'demo-screencast.mp4', type: 'video', size: 67108864, parentId: 'folder-3', createdAt: '2024-02-01T14:00:00Z', modifiedAt: '2024-02-01T14:00:00Z', extension: 'mp4' },
  { id: 'file-3-3', name: 'tutorial-react.mp4', type: 'video', size: 268435456, parentId: 'folder-3-1', createdAt: '2024-02-08T16:00:00Z', modifiedAt: '2024-02-08T16:00:00Z', extension: 'mp4' },
  
  // Projects folder contents
  { id: 'folder-4-1', name: 'nas-drive-web', type: 'folder', size: 0, parentId: 'folder-4', createdAt: '2024-01-18T11:35:00Z', modifiedAt: '2024-02-15T09:00:00Z' },
  { id: 'folder-4-2', name: 'mobile-app', type: 'folder', size: 0, parentId: 'folder-4', createdAt: '2024-01-25T09:00:00Z', modifiedAt: '2024-02-10T14:30:00Z' },
  { id: 'file-4-1', name: 'index.html', type: 'code', size: 2048, parentId: 'folder-4-1', createdAt: '2024-01-18T11:40:00Z', modifiedAt: '2024-02-15T09:00:00Z', extension: 'html' },
  { id: 'file-4-2', name: 'App.tsx', type: 'code', size: 4096, parentId: 'folder-4-1', createdAt: '2024-01-18T11:45:00Z', modifiedAt: '2024-02-15T08:45:00Z', extension: 'tsx' },
  { id: 'file-4-3', name: 'main.tsx', type: 'code', size: 1024, parentId: 'folder-4-1', createdAt: '2024-01-18T11:50:00Z', modifiedAt: '2024-02-14T17:00:00Z', extension: 'tsx' },
  { id: 'file-4-4', name: 'package.json', type: 'code', size: 2048, parentId: 'folder-4-1', createdAt: '2024-01-18T11:55:00Z', modifiedAt: '2024-02-13T10:30:00Z', extension: 'json' },
  { id: 'file-4-5', name: 'App.js', type: 'code', size: 1536, parentId: 'folder-4-2', createdAt: '2024-01-25T09:10:00Z', modifiedAt: '2024-02-10T14:30:00Z', extension: 'js' },
  { id: 'file-4-6', name: 'styles.css', type: 'code', size: 2560, parentId: 'folder-4-2', createdAt: '2024-01-25T09:20:00Z', modifiedAt: '2024-02-08T11:00:00Z', extension: 'css' },
  
  // Work folder contents
  { id: 'file-1-1-1', name: 'client-proposal.docx', type: 'document', size: 1524000, parentId: 'folder-1-1', createdAt: '2024-02-05T11:00:00Z', modifiedAt: '2024-02-05T11:00:00Z', extension: 'docx' },
  
  // Personal folder contents
  { id: 'file-1-2-1', name: 'letter.txt', type: 'document', size: 1024, parentId: 'folder-1-2', createdAt: '2024-02-12T09:20:00Z', modifiedAt: '2024-02-12T09:20:00Z', extension: 'txt' },
  { id: 'file-1-2-2', name: 'contacts.csv', type: 'document', size: 5120, parentId: 'folder-1-2', createdAt: '2021-02-01T00:00:00Z', modifiedAt: '2024-02-01T00:00:00Z', extension: 'csv' },
  
  // Vacation folder contents
  { id: 'file-2-1-1', name: 'beach-sunset.jpg', type: 'image', size: 3145728, parentId: 'folder-2-1', createdAt: '2023-07-15T18:30:00Z', modifiedAt: '2023-07-15T18:30:00Z', extension: 'jpg' },
  { id: 'file-2-1-2', name: 'mountain-view.jpg', type: 'image', size: 2621440, parentId: 'folder-2-1', createdAt: '2023-07-16T09:00:00Z', modifiedAt: '2023-07-16T09:00:00Z', extension: 'jpg' },
  { id: 'file-2-1-3', name: 'city-night.jpg', type: 'image', size: 1835008, parentId: 'folder-2-1', createdAt: '2023-07-17T21:00:00Z', modifiedAt: '2023-07-17T21:00:00Z', extension: 'jpg' },
];
