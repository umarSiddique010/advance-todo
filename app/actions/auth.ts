'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export async function deleteMyAccount() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Unauthorized');
  }

  await prisma.user.delete({
    where: {
      id: session.user.id,
    },
  });

  redirect('/');
}
