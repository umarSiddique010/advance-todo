'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import z, { success } from 'zod';

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const TodoSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  completed: z.boolean(),
  createdAt: z.date(),
});

// Create todo

const CreateTodoSchema = TodoSchema.omit({
  id: true,
  completed: true,
  createdAt: true,
});
export async function createTodo(pevState: State, formData: FormData) {
  const validatedFields = CreateTodoSchema.safeParse({
    title: formData.get('title'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Todo.',
    };
  }

  try {
    await prisma.todo.create({
      data: {
        title: validatedFields.data.title,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Todo.',
    };
  }

  revalidatePath('/');
  return { message: 'Todo Created Successfully', errors: {} };
}

// Toggle completed todo

const ToggleTodoSchema = TodoSchema.omit({
  title: true,
  createdAt: true,
});

export async function toggleTodo(id: string, completed: boolean) {
  const validatedFields = ToggleTodoSchema.safeParse({
    id: id,
    completed: completed,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Failed to Toggle Done Todo',
    };
  }

  try {
    await prisma.todo.update({
      where: {
        id: validatedFields.data.id,
      },
      data: {
        completed: validatedFields.data.completed,
      },
    });
    revalidatePath('/');

    return { success: true, message: 'Todo Toggled Successfully' };
  } catch (error) {
    return {
      success: false,
      message: 'Database Error: Failed to Toggle Done Todo.',
    };
  }
}

// Update todo

const UpdateTodoSchema = TodoSchema.pick({
  title: true,
});

export async function updateTodo(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateTodoSchema.safeParse({
    title: formData.get('title'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Todo.',
    };
  }

  try {
    await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title: validatedFields.data.title,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Todo.',
    };
  }
  revalidatePath('/');

  return { message: 'Todo Updated Successfully', errors: {} };
}

// Delete todo

const DeleteTodoSchema = TodoSchema.pick({
  id: true,
});

export async function deleteTodo(id: string) {
  const validatedFields = DeleteTodoSchema.safeParse({ id });

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid ID' };
  }

  try {
    await prisma.todo.delete({
      where: { id: validatedFields.data.id },
    });

    revalidatePath('/');
    return { success: true, message: 'Deleted' };
  } catch (error) {
    return { success: false, message: 'Database Error' };
  }
}
