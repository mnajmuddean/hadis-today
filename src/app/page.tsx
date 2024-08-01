'use client'

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';

export type Hadis = {
  hadithTitle: string;
  hadithNarrator: string;
  hadithArabic: string;
  hadithEnglish: string;
  hadithStatus: string;
  hadithBookName: string;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'sahih':
      return 'bg-[#1A3636] text-white';
    case 'hasan':
      return 'bg-white text-gray-700';
    case 'da\'eef':
      return 'bg-gray-700 text-white';
    default:
      return 'bg-gray-300 text-gray-700';
  }
};

export default function Home() {
  const [hadiths, setHadiths] = useState<Hadis[]>([]);

  useEffect(() => {
    const fetchHadiths = async () => {
      const response = await fetch('/api/hadis');
      const data: Hadis[] = await response.json();
      setHadiths(data);
    };
    
    fetchHadiths();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-[#C9DABF] to-[#9CA986] overflow-hidden">
      <header className="w-full bg-[#808D7C] text-white py-4 text-center">
        <h1 className="text-4xl sm:text-6xl font-sans font-bold">
          Hadis Today
        </h1>
        <p className="text-lg sm:text-xl font-sans mt-2">Explore the Wisdom of Hadith</p>
      </header>
      <main className="flex-grow flex items-center justify-center w-full relative">
        <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4">
          <Carousel className="w-full">
            <CarouselContent>
              {hadiths.map((hadith, index) => (
                <CarouselItem key={index} className="flex items-center justify-center p-4">
                  <Card className="w-full max-w-md mx-auto bg-[#C9DABF]/90 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-2 border-[#808D7C]">
                    <CardHeader className="bg-[#808D7C] text-white sticky top-0 z-10">
                      <CardTitle className="text-lg sm:text-xl font-arabic font-mono">{hadith.hadithTitle || 'Title Not Yet Available'}</CardTitle>
                      <CardDescription className="text-white/80 font-mono">{hadith.hadithNarrator || 'Narrator Not Yet Available'}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-right font-arabic text-base sm:text-lg leading-loose text-[#5F6F65]">{hadith.hadithArabic || 'Hadith Arabic Not Yet Available'}</p>
                      <p className="mt-4 text-xs sm:text-sm italic text-[#5F6F65] font-mono">{hadith.hadithEnglish || 'Hadith English Not Yet Available'}</p>
                    </CardContent>
                    <CardFooter className="bg-[#9CA986] text-[#5F6F65] font-semibold sticky bottom-0 flex items-center justify-between p-2">
                      <p className='mt-2 text-sm sm:text-base font-mono'>{hadith.hadithBookName || 'Hadith Book Name Not Yet Available'}</p>
                      <span className={`px-2 py-1 rounded mt-2 ${getStatusColor(hadith.hadithStatus)}`}>
                        {hadith.hadithStatus || 'Status Not Yet Available'}
                      </span>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <CarouselPrevious className="pointer-events-auto" />
              <CarouselNext className="pointer-events-auto" />
            </div>
          </Carousel>
        </div>
      </main>
      <footer className="w-full bg-[#808D7C] text-white py-4 text-center">
        <p className="text-xs sm:text-sm font-mono">Created by mnajmuddean</p>
      </footer>
    </div>
  );
}
