'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Importação dinâmica para evitar problemas com SSR
const BlotterText = dynamic(
  () => import('@/components/BlotterText'),
  { ssr: false, loading: () => <div>Carregando efeito...</div> }
);

export default function DemoPage() {
  const [text, setText] = useState('Blotter.js');
  const [speed, setSpeed] = useState(0.5);
  const [volatility, setVolatility] = useState(0.1);
  const [seed, setSeed] = useState(0.1);
  const [fontSize, setFontSize] = useState(120);
  const [color, setColor] = useState('#000000');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Demonstração do Efeito Líquido com Blotter.js
        </h1>
        
        {/* Controles */}
        <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Controles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Texto
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cor do Texto
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-10 p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Velocidade: {speed.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Volatilidade: {volatility.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.05"
                value={volatility}
                onChange={(e) => setVolatility(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Semente: {seed.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={seed}
                onChange={(e) => setSeed(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tamanho da Fonte: {fontSize}px
              </label>
              <input
                type="range"
                min="40"
                max="200"
                step="10"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        {/* Demonstração */}
        <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="w-full max-w-2xl text-center">
            <BlotterText 
              text={text}
              fontSize={fontSize}
              color={color}
              speed={speed}
              volatility={volatility}
              seed={seed}
            />
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Experimente ajustar os controles acima para personalizar o efeito.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Voltar para o site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
