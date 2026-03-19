type TodoSearchProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

export function TodoSearch({ query, onQueryChange }: TodoSearchProps) {
  return (
    <div className="todo-search">
      <label className="sr-only" htmlFor="todo-search">
        Search tasks
      </label>
      <input
        id="todo-search"
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search tasks"
      />
    </div>
  );
}
