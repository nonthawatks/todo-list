import { TODO_ITEMS } from "@/helpers/constant";
import { ModelTodoItem } from "@/models/ModelTodoItems";
import Button from "../commons/button";
import TodoTable from "./todoTable";

const TodoList = () => {
  return (
    <>
      <div>Todo List</div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          {TODO_ITEMS.map((item: ModelTodoItem, index: number) => {
            return <Button key={index}>{item.name}</Button>;
          })}
        </div>
        <TodoTable title="Fruit" items={TODO_ITEMS} />
        <TodoTable title="Vegetable" items={TODO_ITEMS} />
      </div>
    </>
  );
};

export default TodoList;
