import { FileItem } from '@/types/index';
import { FileRow } from './FileRow';
import { FileText, Layers, Calendar, Type } from 'lucide-react';

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
    <div
      className="overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, rgba(26, 26, 29, 0.6), rgba(18, 18, 20, 0.8))',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      {/* Header */}
      <div 
        className="grid grid-cols-[auto_1fr_120px_160px_100px] gap-4 px-4 py-3 text-xs font-medium uppercase tracking-wider"
        style={{
          background: 'rgba(35, 35, 38, 0.5)',
          borderBottom: '1px solid var(--border-default)',
          color: 'var(--text-tertiary)',
        }}
      >
        <div className="w-10" />
        
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5" />
          Name
        </div>
        
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5" />
          Size
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5" />
          Modified
        </div>
        
        <div className="flex items-center gap-2">
          <Type className="w-3.5 h-3.5" />
          Type
        </div>
      </div>

      {/* Items */}
      <div 
        className="divide-y"
        style={{ 
          borderColor: 'var(--border-subtle)',
        }}
      >
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
