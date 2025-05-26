// components/BlotterText.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    Blotter: any;
  }
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function BlotterText({ 
  text, 
  speed = 0.2,
  volatility = 0.1,
  duration = 800,
  alwaysOn = false,
  className = ''
}: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number | null>(null);
  const materialRef = useRef<any>(null);
  const [blotterError, setBlotterError] = useState(false);

  // Animação com easing
  const animate = (start: number, end: number, onUpdate: (value: number) => void) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startTime = performance.now();
    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuad(progress);
      const value = start + (end - start) * eased;
      
      onUpdate(value);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(update);
      }
    };
    animationRef.current = requestAnimationFrame(update);
  };

  // Efeito para o hover
  useEffect(() => {
    if (!materialRef.current || blotterError) return;
    
    const targetValue = isHovered || alwaysOn ? volatility : 0;
    const currentValue = materialRef.current.uniforms.uVolatility.value;
    
    animate(currentValue, targetValue, (value) => {
      materialRef.current.uniforms.uVolatility.value = value;
    });
  }, [isHovered, alwaysOn, volatility, blotterError]);

  // Efeito para inicialização
  useEffect(() => {
    if (typeof window === 'undefined' || !window.Blotter || !containerRef.current || blotterError) {
      return;
    }

    // Limpa o container
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    try {
      const textObj = new window.Blotter.Text(text, {
        family: 'sans-serif',
        size: 64,
        fill: 'currentColor',
        paddingLeft: 10,
        paddingRight: 10
      });

      const material = new window.Blotter.LiquidDistortMaterial();
      material.uniforms.uSpeed.value = speed;
      material.uniforms.uVolatility.value = alwaysOn ? volatility : 0;
      material.uniforms.uSeed.value = 0.1;
      
      materialRef.current = material;

      const blotter = new window.Blotter(material, { 
        texts: textObj 
      });

      const scope = blotter.forText(textObj);
      scope.appendTo(containerRef.current);

    } catch (error) {
      console.error('Error initializing Blotter. Falling back to static text.', error);
      setBlotterError(true);
      if (containerRef.current) {
        containerRef.current.textContent = text;
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text, speed, alwaysOn, volatility, blotterError]);

  // Se houve erro, retorna apenas o texto estático
  if (blotterError) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      onMouseEnter={() => !alwaysOn && setIsHovered(true)}
      onMouseLeave={() => !alwaysOn && setIsHovered(false)}
    />
  );
}