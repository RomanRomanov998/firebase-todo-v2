import { useEffect, useState } from "react";
import s from "./TodoItem.module.css";

export function TodoItem({ item, isEditing, onStartEdit, onCancelEdit, onSaveEdit, onDelete }) {
  const [value, setValue] = useState(item.text || "");

  useEffect(() => {
    if (isEditing) setValue(item.text || "");
  }, [isEditing, item.text]);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSaveEdit(item.id, value);
    }
    if (e.key === "Escape") {
      e.preventDefault();
      onCancelEdit();
    }
  }

  return (
    <li className={s.item}>
      {isEditing ? (
        <>
          <input
            className={s.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <div className={s.actions}>
            <button className={s.button} type="button" onClick={() => onSaveEdit(item.id, value)}>
              Save
            </button>
            <button className={s.buttonGhost} type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={s.text} title={item.text}>{item.text}</div>
          <div className={s.actions}>
            <button className={s.buttonGhost} type="button" onClick={() => onStartEdit(item.id)}>
              Edit
            </button>
            <button className={s.buttonDanger} type="button" onClick={() => onDelete(item.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
