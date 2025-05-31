import React from 'react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Neon animated thunder/lightning SVG */}
      <svg className="absolute left-0 top-0 w-full h-full" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Neon lightning bolt 1 */}
        <polyline
          points="400,100 500,300 450,300 600,600 550,600 700,900"
          stroke="#00fff7"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-lightning1 neon-glow"
        />
        {/* Neon lightning bolt 2 */}
        <polyline
          points="1200,200 1300,400 1250,400 1400,700 1350,700 1500,1000"
          stroke="#ff00e0"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-lightning2 neon-glow"
        />
        {/* Neon arc */}
        <path
          d="M200 900 Q960 200 1720 900"
          stroke="#00ff99"
          strokeWidth="6"
          fill="none"
          className="neon-glow animate-arc"
        />
      </svg>
      <style jsx global>{`
        .neon-glow {
          filter: drop-shadow(0 0 16px #00fff7) drop-shadow(0 0 32px #00fff7);
        }
        .animate-lightning1 {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: lightning1 2.5s cubic-bezier(0.4,0,0.2,1) infinite;
        }
        .animate-lightning2 {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: lightning2 3.2s cubic-bezier(0.4,0,0.2,1) infinite 1.2s;
        }
        .animate-arc {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: arcglow 4s cubic-bezier(0.4,0,0.2,1) infinite 0.5s;
        }
        @keyframes lightning1 {
          0%, 80%, 100% { stroke-dashoffset: 1200; opacity: 0.2; }
          10%, 20% { stroke-dashoffset: 0; opacity: 1; }
          30%, 70% { stroke-dashoffset: 1200; opacity: 0.2; }
        }
        @keyframes lightning2 {
          0%, 85%, 100% { stroke-dashoffset: 1200; opacity: 0.2; }
          15%, 25% { stroke-dashoffset: 0; opacity: 1; }
          35%, 80% { stroke-dashoffset: 1200; opacity: 0.2; }
        }
        @keyframes arcglow {
          0%, 90%, 100% { stroke-dashoffset: 2000; opacity: 0.1; }
          10%, 20% { stroke-dashoffset: 0; opacity: 0.7; }
          30%, 80% { stroke-dashoffset: 2000; opacity: 0.1; }
        }
      `}</style>
    </div>
  );
} 