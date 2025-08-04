'use server';

/**
 * @fileOverview AI-powered layout suggestion flow.
 *
 * - layoutSuggestion - A function that handles layout customization suggestions based on user preferences and data.
 * - LayoutSuggestionInput - The input type for the layoutSuggestion function.
 * - LayoutSuggestionOutput - The return type for the layoutSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LayoutSuggestionInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('The user preferences regarding the dashboard layout.'),
  dataSummary: z
    .string()
    .describe('A summary of the simulated data displayed on the dashboard.'),
});
export type LayoutSuggestionInput = z.infer<typeof LayoutSuggestionInputSchema>;

const LayoutSuggestionOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'AI-powered suggestions for customizing the dashboard layout, optimized for the user preferences and data characteristics.'
    ),
});
export type LayoutSuggestionOutput = z.infer<typeof LayoutSuggestionOutputSchema>;

export async function layoutSuggestion(input: LayoutSuggestionInput): Promise<LayoutSuggestionOutput> {
  return layoutSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'layoutSuggestionPrompt',
  input: {schema: LayoutSuggestionInputSchema},
  output: {schema: LayoutSuggestionOutputSchema},
  prompt: `Based on the user's preferences and the simulated data, provide intelligent suggestions for customizing the dashboard layout.

User Preferences: {{{userPreferences}}}
Data Summary: {{{dataSummary}}}

Suggestions:`,
});

const layoutSuggestionFlow = ai.defineFlow(
  {
    name: 'layoutSuggestionFlow',
    inputSchema: LayoutSuggestionInputSchema,
    outputSchema: LayoutSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
