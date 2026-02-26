import s from "./TodoList.module.css";
import { TodoItem } from "../TodoItem/TodoItem";

export function TodoList({ items, editingId, onStartEdit, onCancelEdit, onSaveEdit, onDelete }) {
  if (!items.length) return <div className={s.empty}>No todos</div>;

  return (
    <ul className={s.list}>
      {items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          isEditing={editingId === item.id}
          onStartEdit={onStartEdit}
          onCancelEdit={onCancelEdit}
          onSaveEdit={onSaveEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
