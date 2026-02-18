'use client';

import { toggleTodo } from '@/lib/action';
import { useState } from 'react';

export default function TodoCheckbox({
  id,
  completed,
}: {
  id: string;
  completed: boolean;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleToggleTodo = async (completed: boolean) => {
    setIsLoading(true);
    const result = await toggleTodo(id, completed);

    if (!result?.success) {
      alert(result.message);
    }

    setIsLoading(false);
  };

  return (
    <input
      name="completed"
      type="checkbox"
      defaultChecked={completed}
      onChange={(e) => handleToggleTodo(e.target.checked)}
      className="w-5 h-5 cursor-pointer accent-green-600"
    />
  );
}
