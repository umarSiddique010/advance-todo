'use client';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { createTodo, State } from '@/lib/action';
import { useActionState } from 'react';

export function InputButtonGroup() {
  const initialState: State = { message: null, errors: {} };

  const [state, todoAction] = useActionState(createTodo, initialState);

  return (
    <form action={todoAction} className="w-full">
      <ButtonGroup className="w-full">
        <Input
          type="text"
          name="title"
          className="text-white"
          id="input-button-group"
          placeholder="Write todo..."
          aria-describedby="input-button-group-error"
        />
        <Button type="submit" className="cursor-pointer" variant="outline">
          Add
        </Button>
      </ButtonGroup>
      <div id="input-button-group-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.title &&
          state.errors.title.map((error) => (
            <p className="text-sm text-destructive">{error}</p>
          ))}
      </div>
    </form>
  );
}
