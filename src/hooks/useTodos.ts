import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";

export const TODO_STORAGE_KEY = "todo-app-items";

function readStoredTodos(): Todo[] {
  try {
    const raw = window.localStorage.getItem(TODO_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch (error) {
    console.error("Failed to read todos from localStorage", error);
    return [];
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => readStoredTodos());

  useEffect(() => {
    try {
      window.localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos to localStorage", error);
    }
  }, [todos]);

  const addTodo = (title: string) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        completed: false
      }
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  return { todos, addTodo, toggleTodo, removeTodo };
}
