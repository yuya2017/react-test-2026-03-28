import { act, renderHook } from "@testing-library/react";
import { useSearch } from "./useSearch";
import type { Todo } from "../types/todo";

const TODOS: Todo[] = [
  { id: "1", title: "Buy milk", completed: false },
  { id: "2", title: "Walk dog", completed: false },
  { id: "3", title: "Buy bread", completed: true },
];

describe("useSearch", () => {
  it("クエリが空のとき全件返す", () => {
    const { result } = renderHook(() => useSearch(TODOS));
    expect(result.current.filteredTodos).toEqual(TODOS);
  });

  it("スペースのみのクエリは全件返す", () => {
    const { result } = renderHook(() => useSearch(TODOS));
    act(() => {
      result.current.setQuery("   ");
    });
    expect(result.current.filteredTodos).toEqual(TODOS);
  });

  it("キーワードに一致するTODOのみ返す", () => {
    const { result } = renderHook(() => useSearch(TODOS));
    act(() => {
      result.current.setQuery("Buy");
    });
    expect(result.current.filteredTodos).toEqual([
      { id: "1", title: "Buy milk", completed: false },
      { id: "3", title: "Buy bread", completed: true },
    ]);
  });

  it("大文字小文字を区別しない", () => {
    const { result } = renderHook(() => useSearch(TODOS));
    act(() => {
      result.current.setQuery("walk");
    });
    expect(result.current.filteredTodos).toEqual([
      { id: "2", title: "Walk dog", completed: false },
    ]);
  });

  it("一致しない場合は空配列を返す", () => {
    const { result } = renderHook(() => useSearch(TODOS));
    act(() => {
      result.current.setQuery("xyz");
    });
    expect(result.current.filteredTodos).toEqual([]);
  });

  it("クエリをクリアすると全件に戻る", () => {
    const { result } = renderHook(() => useSearch(TODOS));
    act(() => {
      result.current.setQuery("milk");
    });
    expect(result.current.filteredTodos).toHaveLength(1);

    act(() => {
      result.current.setQuery("");
    });
    expect(result.current.filteredTodos).toEqual(TODOS);
  });
});
