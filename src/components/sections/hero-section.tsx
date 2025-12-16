"use client";

import { ChevronDown } from "lucide-react";
import { useEffect } from 'react';

export default function HeroSection() {
  useEffect(() => {
    let interval: any;
    (async () => {
      try {
        const confetti = (await import('canvas-confetti')).default;
        confetti({ particleCount: 200, spread: 160, ticks: 300, origin: { y: 0.6 } });

        interval = setInterval(() => {
          confetti({ particleCount: 40, spread: 100, origin: { x: Math.random(), y: Math.random() * 0.6 } });
        }, 400);

        setTimeout(() => clearInterval(interval), 3000);
      } catch (err) {
        console.error('Failed to load confetti:', err);
      }
    })();

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      <div className="absolute inset-0 w-full h-full animated-gradient -z-10" />

      <div className="z-10">
        <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl text-foreground/80">
          Bubbbaaaa
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-foreground/70">
          Happiest Birthdayyyy, My babygirl!!!
        </p>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-foreground/50" />
      </div>
    </section>
  );
}
