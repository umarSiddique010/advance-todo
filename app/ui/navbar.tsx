import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="w-full bg-slate-800">
      <nav className="w-full flex justify-end px-20">
        <ul className="flex gap-5 py-5">
          <li>
            <Link className="border-b-2 border-pink-500 text-white" href={'/'}>
              Home
            </Link>
          </li>
          <li>
            <Link
              className="border-b-2 border-yellow-500 text-white"
              href={'/search'}
            >
              Search
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
