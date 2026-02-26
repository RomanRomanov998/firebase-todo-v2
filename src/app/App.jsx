import { useEffect, useMemo, useState } from "react";
import { createTodo, deleteTodo, subscribeTodos, updateTodo } from "../services/todosApi";
import { useDebounce } from "../hooks/useDebounce";
import { TodoForm } from "../components/TodoForm/TodoForm";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { TodoList } from "../components/TodoList/TodoList";
import "../styles/globals.css";

export function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [sortAlpha, setSortAlpha] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const debouncedSearch = useDebounce(search, 350);

  useEffect(() => {
    const unsub = subscribeTodos(setTodos);
    return () => unsub();
  }, []);

  const visible = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();

    let list = [...todos].sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
    if (q) list = list.filter((t) => (t.text || "").toLowerCase().includes(q));
    if (sortAlpha) {
      list.sort((a, b) => (a.text || "").localeCompare(b.text || "", undefined, { sensitivity: "base" }));
    }
    return list;
  }, [todos, debouncedSearch, sortAlpha]);

  async function handleAdd(text) {
    await createTodo(text);
  }

  function handleStartEdit(id) {
    setEditingId(id);
  }

  function handleCancelEdit() {
    setEditingId(null);
  }

  async function handleSaveEdit(id, text) {
    const v = text.trim();
    if (!v) return;
    await updateTodo(id, v);
    setEditingId(null);
  }

  async function handleDelete(id) {
    await deleteTodo(id);
  }

  return (
    <div className="page">
      <div className="card">
        <header className="header">
          <div>
            <h1 className="title">Todo</h1>
            <div className="subtitle">Firebase Realtime Database</div>
          </div>
        </header>

        <TodoForm onAdd={handleAdd} />

        <Toolbar
          search={search}
          onSearch={setSearch}
          sortAlpha={sortAlpha}
          onToggleSort={() => setSortAlpha((v) => !v)}
        />

        <div className="meta">
          <div>Total: {todos.length}</div>
          <div>Shown: {visible.length}</div>
        </div>

        <TodoList
          items={visible}
          editingId={editingId}
          onStartEdit={handleStartEdit}
          onCancelEdit={handleCancelEdit}
          onSaveEdit={handleSaveEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}