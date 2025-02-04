import { ModelTodoItem } from "@/models/ModelTodoItems";
import { HTMLAttributes } from "react";
import Button from "../commons/button";

interface TodoTableProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  items?: ModelTodoItem[];
  handlePopItem: () => void;
  handleRemoveItem: (item: ModelTodoItem) => void;
}

const TodoTable = (props: TodoTableProps) => {
  const { title, items = [], handlePopItem, handleRemoveItem } = props;
  return (
    <div className="border border-slate-300 h-[600px]" onClick={handlePopItem}>
      <div className="font-bold bg-slate-300 text-center p-2">{title}</div>
      <div className="flex flex-col gap-2 p-3">
        {items.map((item: ModelTodoItem, index: number) => {
          return (
            <Button
              data-testid={`todo-item-${title}`}
              key={index}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                handleRemoveItem(item);
              }}
            >
              {item.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TodoTable;
