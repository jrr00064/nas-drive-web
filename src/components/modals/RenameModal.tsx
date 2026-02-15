import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Type, Check } from 'lucide-react';
import { useFileStore } from '@store/fileStore';

interface RenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string | null;
  itemName: string;
}

export const RenameModal = ({ isOpen, onClose, itemId, itemName }: RenameModalProps) => {
  const [name, setName] = useState(itemName);
  const { renameItem } = useFileStore();

  useEffect(() => {
    if (isOpen) {
      setName(itemName);
    }
  }, [isOpen, itemName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && itemId && name !== itemName) {
      renameItem(itemId, name.trim());
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
            }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div
              className="p-6"
              style={{
                background: 'linear-gradient(145deg, rgba(26, 26, 29, 0.98), rgba(18, 18, 20, 0.99))',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Header */}
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.15))',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    <Type 
                      className="w-5 h-5"
                      style={{ color: 'var(--accent-primary)' }}
                    />
                  </div>
                  
                  <h2 
                    className="text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Rename Item
                  </h2>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg transition-all duration-200"
                  style={{
                    background: 'var(--bg-elevated)',
                    color: 'var(--text-tertiary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bg-hover)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-elevated)';
                    e.currentTarget.style.color = 'var(--text-tertiary)';
                  }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Form */}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    htmlFor="rename-input"
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    New name
                  </label>
                  
                  <div className="relative">
                    <input
                      id="rename-input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200"
                      style={{
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-default)',
                        color: 'var(--text-primary)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-primary)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-default)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') onClose();
                      }}
                    />
                    
                    <div 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-md"
                      style={{
                        background: 'var(--bg-elevated)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {name.length} chars
                    </div>
                  </div>
                  
                  <p 
                    className="text-xs mt-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Current name:{' '}
                    <span style={{ color: 'var(--text-tertiary)' }}>
                      {itemName}
                    </span>
                  </p>
                </div>

                {/* Actions */}
                
                <div className="flex gap-3 justify-end">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-default)',
                      color: 'var(--text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--bg-hover)';
                      e.currentTarget.style.borderColor = 'var(--border-hover)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--bg-elevated)';
                      e.currentTarget.style.borderColor = 'var(--border-default)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!name.trim() || name === itemName}
                    className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2"
                    style={{
                      background: (!name.trim() || name === itemName)
                        ? 'var(--bg-elevated)'
                        : 'linear-gradient(135deg, var(--accent-primary), #7c3aed)',
                      color: (!name.trim() || name === itemName)
                        ? 'var(--text-muted)'
                        : 'white',
                      cursor: (!name.trim() || name === itemName)
                        ? 'not-allowed'
                        : 'pointer',
                      boxShadow: (!name.trim() || name === itemName)
                        ? 'none'
                        : '0 4px 14px rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    <Check className="w-4 h-4" />
                    Rename
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
