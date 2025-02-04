"use client";
import { TODO_ITEMS } from "@/helpers/constant";
import { ModelTodoItem } from "@/models/ModelTodoItems";
import Button from "../commons/button";
import TodoTable from "./todoTable";
import { useState } from "react";
import Header from "../commons/header";

const TodoList = () => {
  const [items, setItems] = useState<ModelTodoItem[]>(TODO_ITEMS);
  const [selectedItems, setSelectedItems] = useState<ModelTodoItem[]>([]);

  const getItemsByType = (type: string) => {
    return selectedItems.filter((item: ModelTodoItem) => item.type === type);
  };

  const handleSelectitem = (item: ModelTodoItem, index: number) => {
    setSelectedItems([...selectedItems, item]);
    items.splice(index, 1);
    setItems([...items]);

    //remove item after selected
    setTimeout(() => {
      handleRemoveItem(item);
    }, 5000);
  };

  const handlePopItem = () => {
    const item = selectedItems.pop();
    setSelectedItems([...selectedItems]);
    if (item) setItems([...items, item]);
  };

  const handleRemoveItem = (removeItem: ModelTodoItem) => {
    setSelectedItems((prevSelectedItems) => {
      const index = prevSelectedItems.findIndex(
        (item: ModelTodoItem) => item === removeItem
      );
      
      if (index === -1) return prevSelectedItems; // return if not found
      prevSelectedItems.splice(index, 1);
      setItems((prevItems) => [...prevItems, removeItem]);

      return prevSelectedItems;
    });
  };

  return (
    <>
      <Header title="Todo List" />
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          {items.map((item: ModelTodoItem, index: number) => {
            return (
              <Button data-testid="todo-item" key={index} onClick={() => handleSelectitem(item, index)}>
                {item.name}
              </Button>
            );
          })}
        </div>
        <TodoTable
          title="Fruit"
          handlePopItem={handlePopItem}
          items={getItemsByType("Fruit")}
          handleRemoveItem={handleRemoveItem}
        />
        <TodoTable
          title="Vegetable"
          handlePopItem={handlePopItem}
          items={getItemsByType("Vegetable")}
          handleRemoveItem={handleRemoveItem}
        />
      </div>
    </>
  );
};

export default TodoList;
