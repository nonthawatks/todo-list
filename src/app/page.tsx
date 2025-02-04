import Playground from "@/components/playground/playground";
import TodoList from "@/components/todoList/todoList";

export default function Home() {
  return (
    <>
      <TodoList />
      <div className="mt-12">
        <Playground />
      </div>
    </>
  );
}
