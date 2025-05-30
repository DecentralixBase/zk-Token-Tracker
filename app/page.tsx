'use client';

import React, { useState, useEffect } from 'react';
import TokenSearch from '../components/TokenSearch';
import TokenTable from '../components/TokenTable';
import { useWatchlist } from '../hooks/useWatchlist';

export default function Home() {
  const { watchlist, loading, addToken, removeToken } = useWatchlist();
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <main className={`min-h-screen p-4 sm:p-8 ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Token Watchlist
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>

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
      </div>
    </main>
  );
} 