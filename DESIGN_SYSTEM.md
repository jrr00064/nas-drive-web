# NAS Drive Web - Design System 2026
## Rediseño UI/UX - Dark Aesthetic Premium

---

## 1. SISTEMA DE COLORES DARK AESTHETIC

### Core Background Palette
| Token | Valor | Uso |
|-------|-------|-----|
| `--bg-primary` | `#0a0a0b` | Fondo principal de la aplicación |
| `--bg-secondary` | `#121214` | Contenedores principales |
| `--bg-tertiary` | `#1a1a1d` | Tarjetas y elementos elevados |
| `--bg-elevated` | `#232326` | Hover states y elementos secundarios |
| `--bg-hover` | `#2a2a2e` | Interacciones hover |
| `--bg-active` | `#323236` | Estados activos/pressed |

### Text Hierarchy
| Token | Valor | Uso |
|-------|-------|-----|
| `--text-primary` | `#fafafa` | Títulos, texto principal |
| `--text-secondary` | `#a1a1aa` | Subtítulos, etiquetas |
| `--text-tertiary` | `#71717a` | Metadatos, hints |
| `--text-muted` | `#52525b` | Placeholders, deshabilitado |

### Accent Colors (Violet-Cyan Gradient System)
| Token | Valor | Uso |
|-------|-------|-----|
| `--accent-primary` | `#8b5cf6` | Botones primarios, selección |
| `--accent-primary-hover` | `#7c3aed` | Hover en elementos primarios |
| `--accent-secondary` | `#06b6d4` | Cyan - acentos secundarios |
| `--accent-success` | `#22c55e` | Estados exitosos |
| `--accent-warning` | `#f59e0b` | Advertencias |
| `--accent-danger` | `#ef4444` | Errores, delete actions |

### Border System (Semi-transparent)
| Token | Valor | Opacidad |
|-------|-------|----------|
| `--border-subtle` | `rgba(255,255,255,0.06)` | 6% - Separadores sutiles |
| `--border-default` | `rgba(255,255,255,0.1)` | 10% - Bordes estándar |
| `--border-hover` | `rgba(255,255,255,0.15)` | 15% - Hover states |
| `--border-active` | `rgba(255,255,255,0.2)` | 20% - Estados activos |

### File Type Colors
| Tipo | Color | Background |
|------|-------|------------|
| Folder | `#8b5cf6` | `rgba(139,92,246,0.15)` |
| Image | `#f472b6` | `rgba(244,114,182,0.15)` |
| Video | `#f87171` | `rgba(248,113,113,0.15)` |
| Audio | `#22d3ee` | `rgba(34,211,238,0.15)` |
| Document | `#fbbf24` | `rgba(251,191,36,0.15)` |
| Archive | `#a78bfa` | `rgba(167,139,250,0.15)` |
| Code | `#34d399` | `rgba(52,211,153,0.15)` |
| Other | `#9ca3af` | `rgba(156,163,175,0.15)` |

---

## 2. SISTEMA DE SOMBRAS (Atmospheric)

```css
/* Shadow Hierarchy */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.4);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4);

/* Glow Effects */
--shadow-glow: 0 0 20px rgba(139, 92, 246, 0.15);
--shadow-glow-cyan: 0 0 20px rgba(6, 182, 212, 0.15);
```

---

## 3. SISTEMA DE ESPACIADO

Base: **4px**

| Token | Valor | Uso típico |
|-------|-------|-------------|
| `--space-1` | 4px | Gaps mínimos, icon spacing |
| `--space-2` | 8px | Padding pequeño, gaps buttons |
| `--space-3` | 12px | Padding inputs, card padding |
| `--space-4` | 16px | Standard padding |
| `--space-5` | 20px | Section padding |
| `--space-6` | 24px | Container padding |
| `--space-8` | 32px | Large gaps |
| `--space-10` | 40px | Section spacing |
| `--space-12` | 48px | Major sections |

---

## 4. SISTEMA DE BORDER RADIUS

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | 6px | Botones pequeños, tags |
| `--radius-md` | 10px | Inputs, botones estándar |
| `--radius-lg` | 14px | Cards, modales |
| `--radius-xl` | 20px | Modales, containers grandes |
| `--radius-full` | 9999px | Pills, avatares |

---

## 5. ESPECIFICACIONES DE COMPONENTES

### 5.1 Button System

**Primary Button**
```
Background: linear-gradient(135deg, var(--accent-primary), #7c3aed)
Text: white
Padding: 10px 16px
Border-radius: var(--radius-md)
Box-shadow: 0 4px 14px rgba(139, 92, 246, 0.3)
Hover: translateY(-1px), shadow más intenso
Transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1)
```

**Secondary Button**
```
Background: var(--bg-elevated)
Border: 1px solid var(--border-default)
Text: var(--text-secondary)
Hover: background var(--bg-hover), border var(--border-hover)
```

**Ghost Button**
```
Background: transparent
Text: var(--text-secondary)
Hover: background var(--bg-elevated), text var(--text-primary)
```

**Danger Button**
```
Background: rgba(239, 68, 68, 0.1)
Border: 1px solid rgba(239, 68, 68, 0.2)
Text: var(--accent-danger)
Hover: background rgba(239, 68, 68, 0.2)
```

### 5.2 Card System (Glass Effect)

**File Card**
```
Background: linear-gradient(145deg, rgba(26,26,29,0.8), rgba(18,18,20,0.9))
Border: 1px solid var(--border-default)
Border-radius: var(--radius-lg)
Box-shadow: var(--shadow-md)
Hover: border var(--border-hover), shadow var(--shadow-lg), translateY(-2px)
Selected: border rgba(139,92,246,0.4), glow effect
Icon container: type-specific gradient background
```

**Modal Card**
```
Background: linear-gradient(145deg, rgba(26,26,29,0.98), rgba(18,18,20,0.99))
Border: 1px solid var(--border-default)
Border-radius: var(--radius-xl)
Box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5)
Backdrop-filter: blur(12px) on overlay
```

### 5.3 Input System

**Text Input**
```
Background: var(--bg-tertiary)
Border: 1px solid var(--border-default)
Border-radius: var(--radius-md)
Padding: 10px 14px
Text: var(--text-primary)
Placeholder: var(--text-tertiary)
Focus: border var(--accent-primary), box-shadow 0 0 0 3px rgba(139,92,246,0.1)
Hover: border var(--border-hover)
```

### 5.4 Context Menu

```
Background: linear-gradient(145deg, rgba(35,35,38,0.98), rgba(26,26,29,0.98))
Border: 1px solid var(--border-default)
Border-radius: var(--radius-lg)
Box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5)
Padding: 6px
Item padding: 8px 12px
Item hover: background var(--bg-elevated), translateX(2px)
Separator: 1px var(--border-subtle)
```

---

## 6. LAYOUT GRID CONSISTENTE

### Estructura Principal
```
┌─────────────────────────────────────────────────────────────┐
│ SIDEBAR (280px collapsed → 80px)    │  HEADER (64px)       │
│                                     │  ─────────────────   │
│  Logo + Brand                       │                      │
│  ─────────────────                  │  Breadcrumbs         │
│                                     │  ─────────────────   │
│  Navigation                         │                      │
│  ├── Home                           │  Content Area        │
│  ├── All Files                      │  (File Grid/List)    │
│  ├── Images                         │                      │
│  ├── Videos                         │                      │
│  ├── Documents                      │                      │
│  └── Archives                       │                      │
│                                     │  ─────────────────   │
│  ─────────────────                  │                      │
│                                     │  Storage Bar         │
│  Storage Mini-Stats                 │                      │
│                                     │                      │
└─────────────────────────────────────┴──────────────────────┘
```

### File Grid Layout
- **Desktop**: `auto-fill, minmax(180px, 1fr)`
- **Tablet**: 3-4 columnas
- **Mobile**: 2 columnas
- **Gap**: 16px

### File List Layout
- Grid: `[auto_1fr_120px_160px_100px]`
- Padding row: 12px 16px
- Header: background sutil, border-bottom

---

## 7. TIPOGRAFÍA

**Font Family**: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700
- Font-smoothing: antialiased
- Feature settings: 'cv02', 'cv03', 'cv04', 'cv11'

**Hierarchy**:
| Element | Size | Weight | Color |
|---------|------|--------|-------|
| H1 (Brand) | 20px | 700 | var(--text-primary) |
| H2 (Section) | 18px | 600 | var(--text-primary) |
| H3 (Card) | 14px | 500 | var(--text-primary) |
| Body | 14px | 400 | var(--text-secondary) |
| Caption | 12px | 400 | var(--text-tertiary) |
| Label | 11px | 500 | var(--text-muted), uppercase, tracking-wider |

---

## 8. ANIMACIONES (Framer Motion)

### Duraciones
| Tipo | Valor |
|------|-------|
| Fast | 150ms |
| Normal | 250ms |
| Slow | 350ms |

### Easing Curves
```
Default: cubic-bezier(0.4, 0, 0.2, 1)
Bounce: cubic-bezier(0.34, 1.56, 0.64, 1)
Smooth: cubic-bezier(0.23, 1, 0.32, 1)
```

### Patrones de Animación
- **Modal**: `scale: 0.95 → 1`, `y: 20 → 0`, `opacity: 0 → 1`
- **Card Hover**: `y: 0 → -4`, `scale: 1 → 1.03`
- **Sidebar**: `x: -280 → 0`, `duration: 500ms`
- **Stagger Children**: `delay: index * 0.05`
- **Skeleton Pulse**: `opacity: 0.5 ↔ 1`, `duration: 1.5s`

---

## 9. COMPONENTES ESPECÍFICOS

### StorageBar
```
Container: card-premium style
Progress bar height: 8px
Border-radius: full
Colors by usage:
  - <50%: emerald → teal gradient
  - 50-75%: amber → yellow gradient  
  - 75-90%: orange → amber gradient
  - >90%: red → rose gradient
Glow effect on progress bar
Stats grid: 3 columns at bottom
```

### Breadcrumbs
```
Container: glass card style
Items: button with hover background
Active item: violet border + background
Separator: chevron icon, muted color
Ellipsis: max-width with truncate
```

### Header
```
Height: 64px
Background: gradient with blur (glass effect)
Border-bottom: var(--border-default)
Backdrop-filter: blur(12px)
Position: sticky
```

---

## 10. PLAN DE IMPLEMENTACIÓN (COMPLETED)

### Phase 1: Foundation ✅
- [x] CSS Variables en `index.css`
- [x] Reset y base styles
- [x] Custom scrollbar styling
- [x] Selection colors
- [x] Focus states

### Phase 2: Layout Components ✅
- [x] `MainLayout.tsx` - grid structure
- [x] `Sidebar.tsx` - navigation + collapsible
- [x] `Header.tsx` - toolbar + search

### Phase 3: Content Components ✅
- [x] `FileCard.tsx` - grid items
- [x] `FileRow.tsx` - list items
- [x] `FileGrid.tsx` - grid container
- [x] `FileList.tsx` - list container

### Phase 4: Navigation ✅
- [x] `Breadcrumbs.tsx` - path navigation
- [x] `ContextMenu.tsx` - right-click menu

### Phase 5: Information Display ✅
- [x] `StorageBar.tsx` - usage visualization

### Phase 6: Modals ✅
- [x] `DeleteModal.tsx`
- [x] `MoveModal.tsx`
- [x] `RenameModal.tsx`
- [x] `PropertiesModal.tsx`

### Phase 7: Polish ✅
- [x] Framer Motion animations
- [x] Hover states
- [x] Focus states
- [x] Loading states
- [x] Empty states

---

## 11. SCREENSHOTS VISUALES

### Color Distribution
```
┌────────────────────────────────────────────────┐
│ ████████████████████████████████████ #0a0a0b  │ <- 70% bg-primary
│ ████████████████████ #121214        │ <- 15% bg-secondary  
│ ████████ #1a1a1d                    │ <- 10% bg-tertiary
│ ██ #232326                          │ <- 5% bg-elevated
└────────────────────────────────────────────────┘
```

### Gradient Usage
- Logo: `linear-gradient(135deg, #8b5cf6, #06b6d4)`
- Primary buttons: `linear-gradient(135deg, #8b5cf6, #7c3aed)`
- Cards: `linear-gradient(145deg, rgba(26,26,29,0.8), rgba(18,18,20,0.9))`
- Selection: `linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.1))`

---

## 12. ICONOGRAFÍA

**Library**: Lucide React
**Style**: Outlined
**Size Scale**:
- XS: 14px (inline)
- SM: 16px (buttons)
- MD: 20px (navigation)
- LG: 24px (empty states)
- XL: 32px (hero icons)

---

**Document Version**: 1.0
**Last Updated**: 2026-02-15
**Status**: ✅ Implemented & Production Ready
