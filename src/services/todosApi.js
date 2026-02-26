import { ref, onValue, push, set, update, remove } from "firebase/database";
import { db } from "./firebase";

const TODOS_PATH = "todos";

export function subscribeTodos(onChange) {
  const todosRef = ref(db, TODOS_PATH);

  return onValue(todosRef, (snapshot) => {
    const value = snapshot.val();
    const list = value
      ? Object.entries(value).map(([id, todo]) => ({ id, ...todo }))
      : [];
    onChange(list);
  });
}

export async function createTodo(text) {
  const todosRef = ref(db, TODOS_PATH);
  const newTodoRef = push(todosRef);

  await set(newTodoRef, {
    text: text.trim(),
    createdAt: Date.now(),
  });
}

export async function updateTodo(id, text) {
  const todoRef = ref(db, `${TODOS_PATH}/${id}`);
  await update(todoRef, { text: text.trim() });
}

export async function deleteTodo(id) {
  const todoRef = ref(db, `${TODOS_PATH}/${id}`);
  await remove(todoRef);
}
