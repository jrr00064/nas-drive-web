import { FileItem } from '@/types/index';
import { FileRow } from './FileRow';
import { FileText, Layers } from 'lucide-react';

interface FileListProps {
  items: FileItem[];
  onItemClick: (item: FileItem) => void;
  onItemDoubleClick: (item: FileItem) => void;
}

export const FileList = ({
  items,
  onItemClick,
  onItemDoubleClick,
}: FileListProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="grid grid-cols-[auto_1fr_120px_160px_100px] gap-4 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400">
        <div className="w-10" />
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Name
        </div>
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4" />
          Size
        </div>
        <div>Modified</div>
        <div>Type</div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {items.map((item) => (
          <FileRow
            key={item.id}
            item={item}
            onClick={() => onItemClick(item)}
            onDoubleClick={() => onItemDoubleClick(item)}
          />
        ))}
      </div>
    </div>
  );
};
