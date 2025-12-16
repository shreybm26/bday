import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET() {
  try {
    const { data: entries, error } = await supabaseAdmin
      .from('guestbook')
      .select('id, name, message, created_at')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Failed to fetch guestbook entries:', error);
      return NextResponse.json({ success: false, entries: [] });
    }

    const mapped = (entries || []).map((e: any) => ({
      id: e.id,
      name: e.name,
      message: e.message,
      createdAt: e.created_at ?? e.createdAt,
    }));

    return NextResponse.json({ success: true, entries: mapped });
  } catch (err) {
    console.error('Error fetching guestbook entries:', err);
    return NextResponse.json({ success: false, entries: [] });
  }
}
