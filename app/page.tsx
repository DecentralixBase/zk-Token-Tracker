'use client';

import React, { useState, useEffect } from 'react';
import TokenSearch from '../components/TokenSearch';
import TokenTable from '../components/TokenTable';
import { useWatchlist } from '../hooks/useWatchlist';
import TopGainers from '../components/TopGainers';
import FullScreenLoader from '../components/FullScreenLoader';
import AuthModal from '../components/AuthModal';

export default function Home() {
  const { watchlist, loading, addToken, removeToken } = useWatchlist();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showChartModal, setShowChartModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  // Simulate initial app loading
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Initialize dark mode based on system preference
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <main className={`min-h-screen p-0 sm:p-0 ${isDarkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900`}> 
      {showLoader && <FullScreenLoader />}
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
      {/* Auth Modal Trigger */}
      <button
        className="fixed top-6 right-24 z-30 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        onClick={() => setShowAuthModal(true)}
      >
        Login / Signup
      </button>
      {/* Chart Modal Trigger Example (for demo) */}
      {/* <button onClick={() => { setShowChartModal(true); setSelectedToken('bitcoin'); }}>Show Chart</button> */}
      <div className="w-full min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-950 shadow-sm sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold text-blue-600 tracking-tight">zk Token Tracker</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              title="Toggle dark mode"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </header>

        {/* Main Dashboard */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar (optional, can add trending, etc.) */}
          <aside className="hidden lg:block col-span-1">
            {/* Placeholder for future sidebar content */}
          </aside>

          {/* Main Content */}
          <section className="col-span-1 lg:col-span-3 flex flex-col gap-8">
            <TopGainers />
            <div className="mb-8">
              <TokenSearch onTokenSelect={addToken} />
            </div>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
              </div>
            ) : (
              <TokenTable tokens={watchlist} onRemove={removeToken} />
            )}
          </section>
        </div>
      </div>
    </main>
  );
} 