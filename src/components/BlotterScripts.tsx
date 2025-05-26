'use client';
import Script from 'next/script';

export function BlotterScripts() {
  return (
    <>
      <Script
        src="/blotter/build/blotter.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/blotter/materials/liquidDistortMaterial.js"
        strategy="beforeInteractive"
      />
    </>
  );
}