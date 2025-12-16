'use client';

import { useState } from 'react';
import LetterSection from './letter-section';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Unlock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CORRECT_PASSCODE = '171202';

export default function PasswordProtectedLetter() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passcode === CORRECT_PASSCODE) {
      setIsAuthenticated(true);
    } else {
      toast({
        title: 'Incorrect Passcode',
        description: 'Please try again.',
        variant: 'destructive',
      });
      setPasscode('');
    }
  };

  if (isAuthenticated) {
    return <LetterSection />;
  }

  return (
    <section className="section-container bg-background">
      <Card className="max-w-md mx-auto shadow-soft">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-center flex items-center justify-center gap-2">
            <Lock className="w-6 h-6 text-primary" />
            A Letter For You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-center text-muted-foreground">
              Enter the passcode to read the letter.
            </p>
            <div className="space-y-2">
              <Input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="text-center"
              />
            </div>
            <Button type="submit" className="w-full">
                <Unlock className="mr-2" />
                Unlock
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
