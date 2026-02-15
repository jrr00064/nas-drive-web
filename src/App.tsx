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
  }, [isDarkMode]);

  return (
    <div className="html.dark:bg-gray-950 transition-colors">
      <MainLayout />
    </div>
  );
}

export default App;
