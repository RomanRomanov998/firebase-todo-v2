# Firebase Todo (React + Realtime Database)

A Todo app built with React (Create React App) and Firebase Realtime Database.

Live: https://roman-8f108.web.app

## Features
- CRUD: create / edit / delete todos
- Phrase search (client-side) + debounce
- A→Z sorting toggle (client-side)
- Persistence: data is stored in Firebase and survives page reloads

## Tech Stack
- React (Create React App)
- Firebase Realtime Database
- Firebase Hosting
- CSS Modules + global styles

## Project Structure
- `src/app` — app shell (composition)
- `src/components` — UI components (TodoForm, Toolbar, TodoList, TodoItem)
- `src/services` — Firebase init + API layer (todos)
- `src/hooks` — shared hooks (useDebounce)
- `src/styles` — global styles
