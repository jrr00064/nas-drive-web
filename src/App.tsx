import { useEffect } from 'react';
import { MainLayout } from '@components/MainLayout';
import { useFileStore } from '@store/fileStore';

function App() {
  const { isDarkMode } = useFileStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Ensure body has correct background
    document.body.style.backgroundColor = '#0a0a0b';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.minHeight = '100vh';
  }, [isDarkMode]);

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#0a0a0b',
      color: '#fafafa',
    }}>
      <MainLayout />
    </div>
  );
}

export default App;
