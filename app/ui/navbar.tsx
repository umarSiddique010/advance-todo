'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { deleteMyAccount } from '@/app/actions/auth';
import { useState } from 'react';

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Warning: Isse tera account aur saare Todos hamesha ke liye bhitre me mil jaayega. Soch kar delete karna ABHI REHNE DE!',
    );

    if (confirmDelete) {
      setIsDeleting(true);
      await signOut();
      await deleteMyAccount();
    }
    setIsDeleting(false);
  };

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
          <li className="ml-4 border-l border-slate-600 pl-4 flex items-center">
            {isPending ? (
              <span className="text-gray-400 text-sm animate-pulse">
                Wait..
              </span>
            ) : session ? (
              <div className="flex items-center gap-3">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full border border-slate-500 shadow-sm"
                  />
                )}
                {/* DANGER ZONE: Delete Button */}
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs font-bold transition-colors shadow-sm disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Account'}
                </button>

                <Button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer shadow-sm"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => signIn.social({ provider: 'google' })}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer shadow-sm"
              >
                Sign In
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
