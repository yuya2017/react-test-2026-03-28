import { type FormEvent, useState } from "react";

type TodoFormProps = {
  onAddTodo: (title: string) => void;
};

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAddTodo(trimmedTitle);
    setTitle("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="todo-title">
        TODO
      </label>
      <input
        id="todo-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add a task"
      />
      <button type="submit">Add</button>
    </form>
  );
}
