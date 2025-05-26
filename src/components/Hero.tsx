// components/Hero.tsx
'use client';

import dynamic from 'next/dynamic';

// Importação dinâmica do BlotterText com SSR desativado
const BlotterText = dynamic(
  () => import('@/components/BlotterText'),
  { 
    ssr: false,
    loading: () => <span>Carregando...</span>
  }
);

export function Hero() {
  return (
    <section className="relative w-full py-20">
      <div className="container px-4 mx-auto text-center">
        <h1 className="mb-6 text-4xl font-bold md:text-6xl">
          <BlotterText 
            text="Julia Sakakibara" 
            speed={0.2}
            volatility={0.08}
            duration={800}
            className="block"
          />
        </h1>
        
        <p className="mb-8 text-xl text-gray-600">
          <BlotterText 
            text="Desenvolvedora e entusiasta de tecnologia" 
            speed={0.15}
            volatility={0.05}
            duration={600}
            className="inline-block"
          />
        </p>
      </div>
    </section>
  );
}