'use server';

/**
 * @fileOverview Generates a personalized farewell message using an LLM.
 *
 * - generatePersonalizedFarewell - A function that generates a personalized farewell message.
 * - PersonalizedFarewellInput - The input type for the generatePersonalizedFarewell function.
 * - PersonalizedFarewellOutput - The return type for the generatePersonalizedFarewell function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedFarewellInputSchema = z.object({
  herName: z.string().describe('The name of the person to generate the farewell message for.'),
  relationship: z.string().describe('Your relationship to the person (e.g., friend, partner, family member).'),
  promise: z.string().describe('A promise or wish for the person.'),
});
export type PersonalizedFarewellInput = z.infer<typeof PersonalizedFarewellInputSchema>;

const PersonalizedFarewellOutputSchema = z.object({
  farewellMessage: z.string().describe('The personalized farewell message.'),
});
export type PersonalizedFarewellOutput = z.infer<typeof PersonalizedFarewellOutputSchema>;

export async function generatePersonalizedFarewell(input: PersonalizedFarewellInput): Promise<PersonalizedFarewellOutput> {
  return generatePersonalizedFarewellFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFarewellPrompt',
  input: {schema: PersonalizedFarewellInputSchema},
  output: {schema: PersonalizedFarewellOutputSchema},
  prompt: `Generate a heartfelt and personalized farewell message for {{herName}}.

  Relationship: {{relationship}}
  Promise: {{promise}}

  Write a short farewell message that is both emotional and memorable, ending with the promise.`,
});

const generatePersonalizedFarewellFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedFarewellFlow',
    inputSchema: PersonalizedFarewellInputSchema,
    outputSchema: PersonalizedFarewellOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
