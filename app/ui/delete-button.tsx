'use client';

import { Button } from '@/components/ui/button';
import { deleteTodo } from '@/lib/action';
import { useState } from 'react';

export default function DeleteButton({ id }: { id: string }) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);

    const result = await deleteTodo(id);

    if (!result?.success) {
      alert(result.message);
    }

    setLoading(false);
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={loading}
      cursor={'pointer'}
      variant={'destructive'}
    >
      {loading ? '...' : '╳'}
    </Button>
  );
}
