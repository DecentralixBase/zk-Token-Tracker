import React from 'react';

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="relative flex flex-col items-center">
        {/* Animated SVG spinner */}
        <svg className="animate-spin h-16 w-16 text-blue-500 mb-6" viewBox="0 0 50 50">
          <circle
            className="opacity-20"
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
          />
          <circle
            className="opacity-80"
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            strokeDasharray="90 150"
            strokeLinecap="round"
          />
        </svg>
        <div className="text-2xl font-extrabold text-white tracking-tight mb-2 drop-shadow-lg">
          zk Token Tracker
        </div>
        <div className="text-base text-blue-200 font-medium animate-pulse">
          Loading the future of tokens...
        </div>
      </div>
    </div>
  );
} 