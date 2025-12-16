import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'guestbook.json');
    const raw = await fs.readFile(dataPath, 'utf-8');
    const entries = JSON.parse(raw);
    return NextResponse.json({ success: true, entries });
  } catch (err) {
    // If file doesn't exist, return empty entries
    return NextResponse.json({ success: true, entries: [] });
  }
}
