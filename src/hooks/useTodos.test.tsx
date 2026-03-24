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
      completed: false,
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
      "todo-app-items",
      JSON.stringify([{ id: "seed-1", title: "Read book", completed: true }]),
    );

    const { result } = renderHook(() => useTodos());

    expect(result.current.todos).toEqual([
      { id: "seed-1", title: "Read book", completed: true },
    ]);
  });

  it("不正な保存データは状態に混ぜない", () => {
    window.localStorage.setItem(
      TODO_STORAGE_KEY,
      JSON.stringify([
        { id: "seed-1", title: "Read book", completed: true },
        { id: 123, title: null, completed: "yes" },
      ]),
    );

    const { result } = renderHook(() => useTodos());

    expect(result.current.todos).toEqual([
      { id: "seed-1", title: "Read book", completed: true },
    ]);
  });

  it("初回マウントでは壊れた保存データを上書きしない", () => {
    const brokenJson = "{";
    window.localStorage.setItem(TODO_STORAGE_KEY, brokenJson);

    renderHook(() => useTodos());

    expect(window.localStorage.getItem(TODO_STORAGE_KEY)).toBe(brokenJson);
  });

  it("状態変更のたびに localStorage へ保存する", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Buy milk");
    });

    const firstTodo = result.current.todos[0];

    expect(window.localStorage.getItem(TODO_STORAGE_KEY)).toBe(
      JSON.stringify([
        {
          id: firstTodo.id,
          title: "Buy milk",
          completed: false,
        },
      ]),
    );

    act(() => {
      result.current.toggleTodo(firstTodo.id);
    });

    expect(window.localStorage.getItem(TODO_STORAGE_KEY)).toBe(
      JSON.stringify([
        {
          id: firstTodo.id,
          title: "Buy milk",
          completed: true,
        },
      ]),
    );

    act(() => {
      result.current.removeTodo(firstTodo.id);
    });

    expect(window.localStorage.getItem(TODO_STORAGE_KEY)).toBe("[]");
  });
});
