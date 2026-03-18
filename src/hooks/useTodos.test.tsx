import { act, renderHook } from "@testing-library/react";
import { TODO_STORAGE_KEY, useTodos } from "./useTodos";

describe("useTodos", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("trim 済みタイトルで TODO を追加する", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("  Buy milk  ");
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0]).toMatchObject({
      title: "Buy milk",
      completed: false
    });
  });

  it("空文字は追加しない", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("   ");
    });

    expect(result.current.todos).toEqual([]);
  });

  it("完了切替と削除ができる", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Buy milk");
    });

    const id = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(id);
    });

    expect(result.current.todos[0].completed).toBe(true);

    act(() => {
      result.current.removeTodo(id);
    });

    expect(result.current.todos).toEqual([]);
  });

  it("保存済み TODO を復元する", () => {
    window.localStorage.setItem(
      TODO_STORAGE_KEY,
      JSON.stringify([{ id: "seed-1", title: "Read book", completed: true }])
    );

    const { result } = renderHook(() => useTodos());

    expect(result.current.todos).toEqual([
      { id: "seed-1", title: "Read book", completed: true }
    ]);
  });
});
