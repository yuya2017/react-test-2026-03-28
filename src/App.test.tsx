import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  window.localStorage.clear();
});

it("追加、完了切替、削除が画面上で行える", async () => {
  const user = userEvent.setup();

  render(<App />);

  await user.type(screen.getByLabelText("TODO"), "Buy milk");
  await user.click(screen.getByRole("button", { name: "Add" }));

  expect(screen.getByRole("checkbox", { name: "Buy milk" })).toBeInTheDocument();

  await user.click(screen.getByRole("checkbox", { name: "Buy milk" }));
  expect(screen.getByRole("checkbox", { name: "Buy milk" })).toBeChecked();

  await user.click(screen.getByRole("button", { name: "Delete Buy milk" }));
  expect(screen.getByText("No tasks yet. Add your first one.")).toBeInTheDocument();
});

it("localStorage に保存済みの TODO を初期表示で復元する", () => {
  window.localStorage.setItem(
    "todo-app-items",
    JSON.stringify([{ id: "seed-1", title: "Read book", completed: true }])
  );

  render(<App />);

  expect(screen.getByRole("checkbox", { name: "Read book" })).toBeChecked();
});
