import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoList } from "./TodoList";

it("TODO が空のとき空状態を表示する", () => {
  render(<TodoList todos={[]} onToggleTodo={vi.fn()} onRemoveTodo={vi.fn()} />);

  expect(
    screen.getByText("No tasks yet. Add your first one."),
  ).toBeInTheDocument();
});

it("TODO 一覧を表示し、各行の操作イベントを親へ渡す", async () => {
  const user = userEvent.setup();
  const onToggleTodo = vi.fn();
  const onRemoveTodo = vi.fn();

  render(
    <TodoList
      todos={[
        { id: "1", title: "Buy milk", completed: false },
        { id: "2", title: "Walk dog", completed: false },
      ]}
      onToggleTodo={onToggleTodo}
      onRemoveTodo={onRemoveTodo}
    />,
  );

  await user.click(screen.getByRole("checkbox", { name: "Buy milk" }));
  await user.click(screen.getByRole("button", { name: "Delete Walk dog" }));

  expect(onToggleTodo).toHaveBeenCalledWith("1");
  expect(onToggleTodo).toHaveBeenCalledTimes(1);
  expect(onRemoveTodo).toHaveBeenCalledWith("2");
  expect(onRemoveTodo).toHaveBeenCalledTimes(1);
});

it("完了済みTODO に is-completed クラスを付ける", () => {
  render(
    <TodoList
      todos={[{ id: "1", title: "Buy milk", completed: true }]}
      onToggleTodo={vi.fn()}
      onRemoveTodo={vi.fn()}
    />,
  );

  expect(screen.getByText("Buy milk")).toHaveClass("is-completed");
});
