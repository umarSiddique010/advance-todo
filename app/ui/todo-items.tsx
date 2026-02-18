'use client';

import clsx from 'clsx';
import DeleteButton from './delete-button';
import TodoCheckbox from './todo-checkbox';
import { Button } from '@/components/ui/button';
import { useActionState, useEffect, useState } from 'react';
import { State, updateTodo } from '@/lib/action';

export default function TodoItems({
  id,
  title,
  completed,
}: {
  id: string;
  title: string;
  completed: boolean;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const updateTodoWithId = updateTodo.bind(null, id);
  const initialState: State = { message: null, errors: {} };

  const [state, updateTodoAction] = useActionState(
    updateTodoWithId,
    initialState,
  );

  useEffect(() => {
    if (
      !state?.errors?.title &&
      state.message === 'Todo Updated Successfully'
    ) {
      setIsEditing(false);
    }
  }, [state]);

  return (
    <li
      key={id}
      className={clsx(
        `w-full flex justify-between items-center px-10 py-2 rounded`,
        {
          'bg-green-700': completed,
          'bg-slate-400': !completed,
        },
      )}
    >
      <TodoCheckbox id={id} completed={completed} />
      {!isEditing ? (
        <h2
          className={clsx({
            'line-through': completed,
          })}
        >
          {title}
        </h2>
      ) : (
        <form action={updateTodoAction}>
          <input
            autoFocus
            name="title"
            type="text"
            defaultValue={title}
            className="border-2 border-black bg-white"
            aria-describedby="update-todo-error"
          />
          <div id="update-todo-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.title &&
              state.errors.title.map((error) => (
                <p className="text-sm text-destructive">{error}</p>
              ))}
          </div>

          <Button type="submit" cursor={'pointer'} variant={'ghost'}>
            ✔️
          </Button>
        </form>
      )}
      <div className="w-1/4 flex  justify-between items-center lg:gap-5">
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} cursor={'pointer'}>
            ✎
          </Button>
        )}
        <DeleteButton id={id} />
      </div>
    </li>
  );
}
