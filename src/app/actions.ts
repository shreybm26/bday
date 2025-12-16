
'use server';

import { generatePersonalizedFarewell, type PersonalizedFarewellInput } from '@/ai/flows/generate-personalized-farewell';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

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

  // Here you would typically save to a database like Firestore.
  // Persist the entry to a simple JSON file so entries survive restarts.
  try {
    const dataPath = path.join(process.cwd(), 'data', 'guestbook.json');
    // Ensure file exists
    let existing: any[] = [];
    try {
      const raw = await fs.readFile(dataPath, 'utf-8');
      existing = JSON.parse(raw);
      if (!Array.isArray(existing)) existing = [];
    } catch (err) {
      // If the file doesn't exist or is malformed, start fresh
      existing = [];
    }

    const entry = {
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };

    // Prepend so newest appears first
    existing.unshift(entry);

    await fs.writeFile(dataPath, JSON.stringify(existing, null, 2), 'utf-8');
    console.log('New guestbook entry persisted:', entry);
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
