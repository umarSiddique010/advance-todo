import { InputButtonGroup } from '@/app/ui/input-button-group';
import DisplayTodo from '@/app/ui/display-todo';


export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
 

  return (
    <main className="h-screen flex flex-col items-center justify-start gap-5 pt-28 bg-slate-800">
      <h1 className="text-4xl text-center font-bold text-gray-50">
        Write Your Todo NOW and Do NEVER
      </h1>

      <div className="w-[90%] lg:w-2/3 pt-10">
        <InputButtonGroup />
      </div>

      <DisplayTodo searchParams={searchParams} />
    </main>
  );
}
