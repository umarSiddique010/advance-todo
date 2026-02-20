'use client';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { createTodo, State } from '@/lib/action';
import { generateSmartTodo } from '@/lib/ai';
import { useActionState, useEffect, useState } from 'react';

export function InputButtonGroup() {
  const initialState: State = { message: null, errors: {} };

  const [state, todoAction] = useActionState(createTodo, initialState);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    const result = await generateSmartTodo();
    if (result?.success && result?.data) {
      setInputValue(''); // Clear the input before setting new value
      setInputValue(result.data); 
    } else {
      alert('AI is currently unavailable. Please try again later.');
    }
    setIsGenerating(false);
  };

useEffect(() => {

    if (state.message && !state.errors?.title) {
      setInputValue('');
    }
  }, [state]);
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
          defaultValue={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          onClick={handleAskAI}
          disabled={isGenerating}
          variant="outline"
          type="button" // Important: Taaki ye form submit na kar de
          title="Ask AI"
        >
          {isGenerating ? '🤖...' : '✨ AI'}
        </Button>
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
