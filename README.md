# FocusBoard

A responsive, single-user task dashboard built for the FocusBoard trainee assessment. Frontend only: no backend, login or APIs.

- **Live app:** https://YOUR-APP.vercel.app  <!-- add after deploying -->
- **GitHub:** https://github.com/YOUR-USERNAME/focusboard  <!-- add after pushing -->

## Tech stack
React 18, Vite, JavaScript (ES6+), plain CSS, React Hooks, localStorage, Lucide React icons.

## Features
- Create, edit and delete tasks (one shared form for create and edit; delete asks for confirmation)
- Status updates (To do, In progress, Completed) from a dropdown on each task
- Case-insensitive title search, status tabs and priority filter that work together, plus Reset filters
- Statistics (total, in progress, completed, completion %) calculated from task data, with zero-task handling
- Three-slide Focus Notes carousel: previous/next (circular), clickable indicators, active-slide highlight
- localStorage persistence; sample data (7 tasks) loads only when nothing valid is saved
- Responsive at 390px, 768px and 1440px; off-canvas navigation on small screens
- Accessibility: semantic landmarks, labelled fields, visible focus rings, keyboard-operable dialogs (Esc closes), status shown as text plus icon

## Folder structure
```
src/
  components/  Sidebar, Header, StatCard, FocusNotes, SearchBar, FilterTabs,
               TaskList, TaskCard, TaskForm, ConfirmDialog
  data/        sampleTasks.js
  hooks/       useLocalStorage.js
  App.jsx  main.jsx  index.css
```

## Run locally
```
npm install
npm run dev
```
Build: `npm run build` (output in `dist`).

## State management
I used React hooks only (`useState`, `useMemo`), with no extra library, because the app is small and all shared state lives in one place.

- **Single source of truth:** `App.jsx` owns the full `tasks` array through `useLocalStorage('focusboard_tasks', sampleTasks)`. Cards, stats, filters and the form all read from it.
- **Predictable mutations:** add, edit, status change and delete use `setTasks(prev => ...)` with `map`, `filter` and spread, never mutating state directly. Edit keeps the original `id`.
- **Derived values:** the statistics, search results, tab counts and filtered list are computed on each render from `tasks` plus the search/status/priority state. Filters never change the stored data.
- **Carousel state:** `FocusNotes` keeps the active slide index; slide, dots and counter all come from that one value.
- **localStorage:** the hook reads and parses saved JSON once at start-up, falling back to sample data only if nothing valid exists, and writes the latest tasks in an effect. Both steps are wrapped in try/catch.

## Known limitations
- Sidebar items other than Overview, the notification bell and the profile avatar are visual placeholders.
- Focus Notes text and exact styling should be matched to the Figma frames (I could not open Figma while building the first version).
- Data is per-browser (localStorage) and not synced.
