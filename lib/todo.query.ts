'use server';

import prisma from '@/lib/prisma';

export async function fetchTodos(
  itemsPerPage: number,
  skip: number,
) {
 return await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
    take: itemsPerPage,
    skip: skip,
  });
}

export async function getTotalItems() {
  return await prisma.todo.count();
}
