import type { Todo } from "../types/todo";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onRemoveTodo: (id: string) => void;
};

export function TodoList({
  todos,
  onToggleTodo,
  onRemoveTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return <p className="empty-state">No tasks yet. Add your first one.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </ul>
  );
}
