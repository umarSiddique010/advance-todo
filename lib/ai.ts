'use server';

import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

export async function generateSmartTodo() {
  try {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    // 👇 Change: 'gemini-2.0-flash' hata ke ye laga
    // Ye alias hai, jo bhi current free model hoga wo chal jayega
    const { text } = await generateText({
      model: google('gemini-flash-latest'), 
      prompt: 'Generate a single, short, concise, and productive todo task for a people who do time pass in their daily routine like me. Do not use quotes. Max 5-6 words.',
    });

    return { success: true, data: text };

  } catch (error) {
    console.error("AI Error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown AI Error' 
    };
  }
}