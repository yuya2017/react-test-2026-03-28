import "./App.css";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

export default function App() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();

  return (
    <main className="app-shell">
      <section className="todo-card" aria-labelledby="todo-heading">
        <div className="card-header">
          <p className="eyebrow">Today</p>
          <h1 id="todo-heading">My Tasks</h1>
          <p className="card-copy">
            A calm space for the three things that actually matter today.
          </p>
        </div>
        <TodoForm onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onRemoveTodo={removeTodo}
        />
      </section>
    </main>
  );
}
