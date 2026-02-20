import prisma from '@/lib/prisma';
import SearchTodo from '../ui/search-todo';
import TodoItems from '../ui/todo-items';
import { Todo } from '@prisma/client';

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const todos: Todo[] = await prisma.todo.findMany({
    where: {
      title: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main className="w-ful h-screen flex flex-col items-center justify-start gap-5 pt-28 bg-slate-800">
      <SearchTodo />

      <section className="w-2/3 mt-5">
        <ul>
          {todos.length === 0 ? (
            <p className="text-slate-400 text-center">
              No tasks found for "{query}"
            </p>
          ) : (
            todos.map((todo) => (
              <TodoItems
                key={todo.id}
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
              />
            ))
          )}
        </ul>
      </section>
    </main>
  );
}
