
'use server';

import { generatePersonalizedFarewell, type PersonalizedFarewellInput } from '@/ai/flows/generate-personalized-farewell';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';

const GuestbookEntrySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must be 50 characters or less."}),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must be 500 characters or less."}),
});

export type GuestbookEntry = z.infer<typeof GuestbookEntrySchema>;

export async function addGuestbookEntry(prevState: any, formData: FormData) {
  const parsed = GuestbookEntrySchema.safeParse({
    name: formData.get('name'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return {
        message: 'Invalid form data.',
        errors: parsed.error.flatten().fieldErrors,
        data: null
    }
  }

  // Persist the entry to Supabase
  try {
    const { data: inserted, error } = await supabaseAdmin
      .from('guestbook')
      .insert([{ name: parsed.data.name, message: parsed.data.message }]);

    if (error) {
      console.error('Failed to persist guestbook entry:', error);
    } else {
      console.log('New guestbook entry persisted:', inserted);
    }
  } catch (err) {
    console.error('Failed to persist guestbook entry:', err);
  }
  
  return {
    message: 'Your message has been received!',
    errors: null,
    data: { ...parsed.data, createdAt: new Date().toISOString() },
  };
}


export async function getFarewellMessage(input: PersonalizedFarewellInput) {
    try {
        const result = await generatePersonalizedFarewell(input);
        return { success: true, message: result.farewellMessage };
    } catch (error) {
        console.error("Error generating farewell message:", error);
        return { success: false, error: "Could not generate the message at this time. Please try again later." };
    }
}
