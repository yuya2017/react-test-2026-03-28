import { useState } from "react";
import type { Todo } from "../types/todo";

type UseSearchResult = {
  query: string;
  setQuery: (query: string) => void;
  filteredTodos: Todo[];
};

export function useSearch(todos: Todo[]): UseSearchResult {
  const [query, setQuery] = useState("");

  const filteredTodos =
    query.trim() === ""
      ? todos
      : todos.filter((todo) =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        );

  return { query, setQuery, filteredTodos };
}
