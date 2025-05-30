import React from 'react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-30 rounded-full blur-3xl animate-blob1" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-pink-500 via-yellow-500 to-blue-500 opacity-20 rounded-full blur-3xl animate-blob2" />
      <div className="absolute top-[30%] right-[-15%] w-[40vw] h-[40vw] bg-gradient-to-tl from-green-400 via-blue-400 to-purple-400 opacity-20 rounded-full blur-3xl animate-blob3" />
      <style jsx global>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20vw, 10vh) scale(1.1); }
          66% { transform: translate(-10vw, 5vh) scale(0.95); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-10vw, -10vh) scale(1.05); }
          66% { transform: translate(10vw, 10vh) scale(1.1); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-10vw, 10vh) scale(1.1); }
          66% { transform: translate(10vw, -10vh) scale(0.9); }
        }
        .animate-blob1 { animation: blob1 18s ease-in-out infinite; }
        .animate-blob2 { animation: blob2 22s ease-in-out infinite; }
        .animate-blob3 { animation: blob3 20s ease-in-out infinite; }
      `}</style>
    </div>
  );
} 