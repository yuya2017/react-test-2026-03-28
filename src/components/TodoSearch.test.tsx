import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoSearch } from "./TodoSearch";

it("検索ボックスを表示する", () => {
  render(<TodoSearch query="" onQueryChange={vi.fn()} />);
  expect(
    screen.getByRole("searchbox", { name: "Search tasks" }),
  ).toBeInTheDocument();
});

it("query の値を入力に反映する", () => {
  render(<TodoSearch query="milk" onQueryChange={vi.fn()} />);
  expect(screen.getByRole("searchbox", { name: "Search tasks" })).toHaveValue(
    "milk",
  );
});

it("入力変更時に onQueryChange を呼ぶ", async () => {
  const user = userEvent.setup();
  const onQueryChange = vi.fn();
  render(<TodoSearch query="" onQueryChange={onQueryChange} />);

  await user.type(
    screen.getByRole("searchbox", { name: "Search tasks" }),
    "dog",
  );

  expect(onQueryChange).toHaveBeenCalledTimes(3);
  expect(onQueryChange).toHaveBeenLastCalledWith("g");
});
