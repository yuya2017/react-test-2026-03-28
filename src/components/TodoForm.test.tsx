import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoForm } from "./TodoForm";

it("trim 済みタイトルを submit して入力欄を空に戻す", async () => {
  const user = userEvent.setup();
  const onAddTodo = vi.fn();

  render(<TodoForm onAddTodo={onAddTodo} />);

  await user.type(screen.getByLabelText("TODO"), "  Buy milk  ");
  await user.click(screen.getByRole("button", { name: "Add" }));

  expect(onAddTodo).toHaveBeenCalledWith("Buy milk");
  expect(screen.getByLabelText("TODO")).toHaveValue("");
});
