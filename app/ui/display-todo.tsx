import TodoItems from './todo-items';
import Pagination from './pagination';
import { fetchTodos, getTotalItems } from '../../lib/todo.query';

export default async function DisplayTodo({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const itemsPerPage = 3;

  const currentPage = Number(searchParams?.page) || 1;
  const skip = (currentPage - 1) * itemsPerPage;

  const todos = await fetchTodos(itemsPerPage, skip);
  const totalItem = await getTotalItems();
  const totalPages = Math.ceil(totalItem / itemsPerPage);

  return (
    <section className="flex flex-col items-center lg:w-1/2 lg:h-1/3 h-[90%] w-[90%]">
      <ul className="flex flex-col items-center w-full h-[85%] gap-5 p-2 lg:p-1">
        {todos.map((todo) => (
          <TodoItems
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
          />
        ))}
      </ul>
      <Pagination totalPages={totalPages} />
    </section>
  );
}
