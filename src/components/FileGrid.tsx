import { FileItem } from '@/types/index';
import { FileCard } from './FileCard';

interface FileGridProps {
  items: FileItem[];
  onItemClick: (item: FileItem) => void;
  onItemDoubleClick: (item: FileItem) => void;
}

export const FileGrid = ({
  items,
  onItemClick,
  onItemDoubleClick,
}: FileGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
      {items.map((item) => (
        <FileCard
          key={item.id}
          item={item}
          onClick={() => onItemClick(item)}
          onDoubleClick={() => onItemDoubleClick(item)}
        />
      ))}
    </div>
  );
};
