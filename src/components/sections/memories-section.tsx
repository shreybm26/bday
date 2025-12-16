'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function MemoriesSection() {
  return (
    <section className="section-container bg-secondary/50">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl md:text-5xl">My bubba</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A few of the unlimited photos of yours that I love
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-xs md:max-w-xl lg:max-w-2xl mx-auto"
      >
        <CarouselContent>
          {PlaceHolderImages.map((img) => (
            <CarouselItem key={img.id}>
              <Card className="overflow-hidden shadow-soft">
                <CardContent className="p-0 flex flex-col items-center justify-center">
                  <Image
                    src={img.imageUrl}
                    alt={img.description}
                    width={600}
                    height={800}
                    className="aspect-[3/4] object-cover"
                    data-ai-hint={img.imageHint}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 md:-left-12" />
        <CarouselNext className="-right-4 md:-right-12" />
      </Carousel>
    </section>
  );
}
