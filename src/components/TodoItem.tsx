import type { Todo } from "../types/todo";

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (id: string) => void;
  onRemoveTodo: (id: string) => void;
};

export function TodoItem({ todo, onToggleTodo, onRemoveTodo }: TodoItemProps) {
  return (
    <li className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleTodo(todo.id)}
        />
        <span className={todo.completed ? "is-completed" : ""}>
          {todo.title}
        </span>
      </label>
      <button type="button" onClick={() => onRemoveTodo(todo.id)}>
        Delete {todo.title}
      </button>
    </li>
  );
}
