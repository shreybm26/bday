'use client';
import { useState } from 'react';
import { getFarewellMessage } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ClosingSection() {
    const [relationship, setRelationship] = useState('partner');
    const [promise, setPromise] = useState('to always be by your side');
    const [generatedMessage, setGeneratedMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setGeneratedMessage('');

        const result = await getFarewellMessage({
            herName: 'Eleonora',
            relationship,
            promise,
        });

        setIsLoading(false);
        if (result.success) {
            setGeneratedMessage(result.message!);
        } else {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            });
        }
    };


  return (
    <section className="section-container bg-secondary/50 w-full">
        <div className="text-center">
            <h2 className="font-headline text-4xl md:text-5xl text-primary">With All My Heart</h2>
            <p className="mt-4 font-handwriting text-3xl md:text-4xl text-foreground/70">
                My promise is to walk with you, to cherish you, and to love you, today and for all of our tomorrows.
            </p>
        </div>

        <Card className="max-w-2xl mx-auto mt-12 shadow-soft">
            <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-center text-muted-foreground mb-6">Create one last message for her...</p>
                    <div className="space-y-2">
                        <Label htmlFor="relationship">My relationship to her</Label>
                        <Input id="relationship" value={relationship} onChange={(e) => setRelationship(e.target.value)} placeholder="e.g., friend, partner"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="promise">A promise to her</Label>
                        <Input id="promise" value={promise} onChange={(e) => setPromise(e.target.value)} placeholder="e.g., to always support you"/>
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Generate a Farewell Note'}
                    </Button>
                </form>

                {generatedMessage && (
                    <div className="mt-8 border-t pt-6 text-center">
                        <Heart className="w-8 h-8 text-accent mx-auto mb-4"/>
                        <p className="text-lg italic text-foreground/80 leading-relaxed">
                            "{generatedMessage}"
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    </section>
  );
}
