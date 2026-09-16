'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: 'সুন্নাহার Power',
    subtitle: 'অন্ধকারে ভরসার আলো',
    cta: 'এখনই কিনুন',
    href: '/shop',
    bg: 'from-orange-600 to-orange-400',
    image: null,
  },
  {
    id: 2,
    title: 'বেস্ট ফ্ল্যাশলাইট কালেকশন',
    subtitle: 'সর্বোচ্চ মান, সাশ্রয়ী দাম',
    cta: 'দেখুন',
    href: '/shop',
    bg: 'from-gray-800 to-gray-600',
    image: null,
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent(prev => (prev + 1) % SLIDES.length);

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/5' }}>
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className={`w-full h-full bg-gradient-to-r ${slide.bg} flex items-center`}>
            <div className="max-w-7xl mx-auto px-8 w-full">
              <div className="max-w-lg">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow">
                  {slide.title}
                </h1>
                <p className="text-white/90 text-lg mb-6">{slide.subtitle}</p>
                <a
                  href={slide.href}
                  className="inline-block bg-white text-[#FF6600] font-bold px-8 py-3 rounded-full hover:bg-orange-50 transition-colors shadow-lg"
                >
                  {slide.cta} →
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
      >
        <ChevronLeft size={20} className="text-gray-700" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
      >
        <ChevronRight size={20} className="text-gray-700" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`rounded-full transition-all ${
              idx === current ? 'bg-white w-6 h-2' : 'bg-white/50 w-2 h-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
