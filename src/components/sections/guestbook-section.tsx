'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { addGuestbookEntry, type GuestbookEntry } from '@/app/actions';
import { useToast } from "@/hooks/use-toast"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, MessageSquare } from 'lucide-react';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Leave a Message'}
    </Button>
  );
}

export default function GuestbookSection() {
  const [state, formAction] = useActionState(addGuestbookEntry, initialState);
  const [messages, setMessages] = useState<GuestbookEntry[]>([]);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  // Load persisted entries on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/guestbook');
        if (!res.ok) return;
        const data = await res.json();
        if (mounted && data?.entries) {
          setMessages(data.entries as GuestbookEntry[]);
        }
      } catch (err) {
        console.error('Failed to load guestbook entries:', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (state.message) {
      if (state.data) {
        toast({
            title: "Success!",
            description: state.message,
        });
        setMessages(prev => [state.data as GuestbookEntry, ...prev]);
        formRef.current?.reset();
      } else if (state.errors) {
         const errorMessages = Object.values(state.errors).flat().join('\n');
         toast({
            title: "Oops!",
            description: errorMessages || "Please check your input.",
            variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  return (
    <section className="section-container bg-background">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl md:text-5xl">Leave Your Wishes</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Share a memory or a message for Shreya.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Guestbook</CardTitle>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" name="name" placeholder="E.g., A Friend, Family" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" name="message" placeholder="Share a heartfelt message..." required minLength={10} />
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
            {messages.map((msg, index) => (
                <Card key={index} className="bg-secondary/50 border-none">
                    <CardContent className="p-6">
                        <blockquote className="space-y-4">
                            <p className="flex items-start gap-3 text-foreground/80">
                                <MessageSquare className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                <span>"{msg.message}"</span>
                            </p>
                            <footer className="flex items-center gap-3 text-sm font-semibold text-primary">
                                <User className="w-4 h-4" />
                                {msg.name}
                            </footer>
                        </blockquote>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
