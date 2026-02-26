import { useState } from "react";
import s from "./TodoForm.module.css";

export function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    await onAdd(value);
    setText("");
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input
        className={s.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a todo..."
        maxLength={120}
      />
      <button className={s.button} type="submit">
        Add
      </button>
    </form>
  );
}
