'use client';
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heart } from "lucide-react";

const notes = [
  {
    title: "What You Do to Me",
    content: "You have this calm presence that settles me. No matter how chaotic things get, I know you will always bring me back to myself. Just knowing you’re there makes everything feel better and doable. And I will be forever grateful to my babygirl for that!!",
  },
  {
    title: "About Us, From Afar",
    content: "Whenever we are not together physically, I realise how strong we are. Distance never weakens anything, touchwood. It only made me love you even more. I miss you in small, everyday ways. And I’m counting the days when I will get to see my bubba again",
  },
  {
    title: "How I See You",
    content: "I don’t just love you, I genuinely admire you mera bacha. You inspire me more than you know in so many things. I just wish you get to see yourself through my lens at least once and see what a SIMP I am for you 😭",
  },
  {
    title: "A Promise",
    content: "Promise, yess. Its your birthday and I just want to make a promise to you that no matter what, I will always listen to you tell me about anything. Be it a rant or be it a gossip. I will never make you feel unheard. I promise that to my babygirl",
  },
];

export default function NotesSection() {
  return (
    <section className="section-container bg-background">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl md:text-5xl">A Few Notes For You</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Little thoughts I've saved along the way.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {notes.map((note, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-soft transition-all duration-300 group flex items-center hover:-translate-y-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                    <Heart className="w-6 h-6 text-red-400 fill-current" />
                    {note.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl">{note.title}</DialogTitle>
                <DialogDescription asChild>
                  <div className="pt-4 text-base text-foreground/80 leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
