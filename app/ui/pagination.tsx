'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { generatePagination } from '../utils/generate-pagination';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        disabled={currentPage <= 1}
        asChild={currentPage > 1}
      >
        {currentPage > 1 ? (
          <Link href={createPageURL(currentPage - 1)}>&lt;</Link>
        ) : (
          <span>&lt;</span>
        )}
      </Button>
      <span className="text-white font-bold">
        <NumberButton
          currentPage={currentPage}
          totalPages={totalPages}
          createPageURL={createPageURL}
        />
      </span>
      <Button
        variant={'outline'}
        disabled={currentPage >= totalPages}
        asChild={currentPage < totalPages}
      >
        {currentPage <= totalPages ? (
          <Link href={createPageURL(currentPage + 1)}>&gt;</Link>
        ) : (
          <span>&gt;</span>
        )}
      </Button>
    </div>
  );
}

function NumberButton({
  currentPage,
  totalPages,
  createPageURL,
}: {
  currentPage: number;
  totalPages: number;
  createPageURL: (page: number | string) => string;
}) {
  const allPages = generatePagination(totalPages, currentPage);

  return (
    <div className="flex gap-2">
      {allPages.map((page, index) => {
        if (page === undefined) return null;

        if (page === '...') {
          return (
            <span key={index} className="px-2 py-2 text-white">
              ...
            </span>
          );
        }

        return (
          <Button
            key={index}
            variant={currentPage === page ? 'default' : 'outline'}
            asChild
            className={`${
              currentPage === page
                ? 'bg-blue-600 text-white hover:bg-blue-500 border-blue-600'
                : 'bg-slate-700 text-white hover:bg-slate-600 border-slate-600'
            }`}
          >
            <Link href={createPageURL(page)}>{page}</Link>
          </Button>
        );
      })}
    </div>
  );
}
