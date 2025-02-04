import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Home from "../../../src/components/todoList/todoList";
import TodoList from "../../../src/components/todoList/todoList";
import { TODO_ITEMS } from "@/helpers/constant";

describe("Todo List", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

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

    //expect type
    const itemType = items[0].type;
    const itemSelected = screen.getAllByTestId(`todo-item-${itemType}`);
    expect(itemSelected[0]).toHaveTextContent(items[0].name);

    expect(container).toBeInTheDocument();
  });

  it("should render Todo List and can remove item correctly", async () => {
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

    //expect type
    const itemType = items[0].type;
    const itemSelected = screen.getAllByTestId(`todo-item-${itemType}`);
    expect(itemSelected[0]).toHaveTextContent(items[0].name);

    //remove item
    fireEvent.click(itemSelected[0]);
    let itemRemoved = [];
    try {
      itemRemoved = screen.getAllByTestId(`todo-item-${itemType}`);
    } catch (error) {
      console.log(`todo-item-${itemType} not found`);
    }
    expect(itemRemoved.length).toBe(0); // Or expect(itemSelected).toHaveLength(0);
    const todoItemsAfterRemove = screen.getAllByTestId("todo-item");
    expect(todoItemsAfterRemove.length).toBe(items.length);

    expect(container).toBeInTheDocument();
  });
});

describe("Todo Auto Remove", () => {
  it("should remove item after 5 seconds", async () => {
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

    //expect type
    const itemType = items[0].type;
    const itemSelected = screen.getAllByTestId(`todo-item-${itemType}`);
    expect(itemSelected[0]).toHaveTextContent(items[0].name);

    //wait for 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    const todoItemsAfterRemove = screen.getAllByTestId("todo-item");
    expect(todoItemsAfterRemove.length).toBe(items.length);
  });

  it("should remove item after 5 seconds, when at 4 it should not remove", async () => {
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

    //expect type
    const itemType = items[0].type;
    const itemSelected = screen.getAllByTestId(`todo-item-${itemType}`);
    expect(itemSelected[0]).toHaveTextContent(items[0].name);

    //wait for 4 seconds
    act(() => {
      jest.advanceTimersByTime(4000);
    });
    const todoItemsAfterRemove = screen.getAllByTestId("todo-item");
    expect(todoItemsAfterRemove.length).toBe(items.length - 1);
  });
});
