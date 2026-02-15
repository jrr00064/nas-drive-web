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
    <div 
      className="grid gap-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      }}
    >
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
