import { InputButtonGroup } from '@/app/ui/input-button-group';
import DisplayTodo from '@/app/ui/display-todo';
import { auth } from '@/lib/auth';
import { headers } from 'next/dist/server/request/headers';

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return (
      <main className="flex flex-col items-center bg-slate-600 justify-center min-h-screen text-center px-4">
        <h1 className="text-5xl font-extrabold text-slate-800 mb-6">
          Welcome to Advance Todo 🚀
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mb-8">
          Apne tasks ko securely manage karne ke liye pehle login karein.
        </p>
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">
            👆 Upar Navbar mein "Sign In" button par click karein. 
            <br /> warna bhitre jaaye or dusra aaap dhundo yaha magaz maari mat karo...
          </span>
        </div>
      </main>
    );
  }

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
