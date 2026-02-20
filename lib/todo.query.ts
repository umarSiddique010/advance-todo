'use server';

import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';

export async function fetchTodos(
  itemsPerPage: number,
  skip: number,
): Promise<Todo[]> {
  return prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
    take: itemsPerPage,
    skip,
  });
}

export async function getTotalItems() {
  return await prisma.todo.count();
}
