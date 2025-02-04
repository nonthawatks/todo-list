import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "../src/components/todoList/todoList";
import TodoList from "../src/components/todoList/todoList";
import { TODO_ITEMS } from "@/helpers/constant";

describe("Todo List", () => {
  it("should render Todo List and can select item correctly", () => {
    const items = [...TODO_ITEMS];
    const { container } = render(<TodoList />);

    //get all button datatestid is todo-item
    const todoItems = screen.getAllByTestId("todo-item");
    console.log("buttons", todoItems.length);

    //select item
    expect(todoItems.length).toBe(items.length);
    expect(todoItems[0]).toHaveTextContent(items[0].name);
    fireEvent.click(todoItems[0]);
    const todoItemsAfterSelect = screen.getAllByTestId("todo-item");
    expect(todoItemsAfterSelect[0]).not.toHaveTextContent(items[0].name);
    expect(todoItemsAfterSelect.length).toBe(items.length - 1);

    expect(container).toBeInTheDocument();
  });
});
