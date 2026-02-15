# NAS Drive Web

A modern, feature-rich file manager web application built with React 19, TypeScript, Tailwind CSS v4, and Zustand.

## Features

- <strong>File Management</strong>: Create, rename, move, and delete files and folders
- <strong>Dual View Modes</strong>: Toggle between Grid and List views
- <strong>Folder Navigation</strong>: Navigate through folders with breadcrumbs
- <strong>Search</strong>: Real-time search filtering
- <strong>Context Menu</strong>: Right-click menu for file operations
- <strong>Storage Visualization</strong>: Visual storage bar with usage statistics
- <strong>Dark Mode</strong>: Full dark mode support
- <strong>Animations</strong>: Smooth animations powered by Framer Motion
- <strong>Persistence</strong>: Demo data with localStorage persistence

## Tech Stack

- React 19
- TypeScript (Strict)
- Vite 6
- Tailwind CSS v4
- Zustand (State Management)
- Framer Motion (Animations)
- Lucide React (Icons)

## Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 10

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd nas-drive-web

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Demo Data

The application comes with demo data including:
- 25+ files and folders
- Images, documents, videos, and code files
- Realistic file sizes and dates
- Nested folder structure

## Project Structure

```
nas-drive-web/
├── src/
│   ├── components/
│   │   ├── modals/
│   │   │   ├── RenameModal.tsx
│   │   │   ├── MoveModal.tsx
│   │   │   ├── DeleteModal.tsx
│   │   │   └── PropertiesModal.tsx
│   │   ├── MainLayout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── FileGrid.tsx
│   │   ├── FileList.tsx
│   │   ├── FileCard.tsx
│   │   ├── FileRow.tsx
│   │   ├── ContextMenu.tsx
│   │   ├── StorageBar.tsx
│   │   └── Breadcrumbs.tsx
│   ├── store/
│   │   └── fileStore.ts
│   ├── hooks/
│   │   └── useContextMenu.ts
│   ├── utils/
│   │   └── fileHelpers.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License

MIT
