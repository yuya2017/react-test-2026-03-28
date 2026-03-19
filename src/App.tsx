import "./App.css";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { TodoSearch } from "./components/TodoSearch";
import { useSearch } from "./hooks/useSearch";
import { useTodos } from "./hooks/useTodos";

export default function App() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const { query, setQuery, filteredTodos } = useSearch(todos);

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
        <TodoSearch query={query} onQueryChange={setQuery} />
        <TodoList
          todos={filteredTodos}
          onToggleTodo={toggleTodo}
          onRemoveTodo={removeTodo}
        />
      </section>
    </main>
  );
}
