'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Token } from '../types/token';
import { searchTokens } from '../utils/api';

interface TokenSearchProps {
  onTokenSelect: (token: Token) => void;
}

export default function TokenSearch({ onTokenSelect }: TokenSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      const searchResults = await searchTokens(query);
      setResults(searchResults);
      setLoading(false);
    };

    const timeoutId = setTimeout(handleSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (token: Token) => {
    onTokenSelect(token);
    setQuery('');
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        placeholder="Add tokens to watchlist"
        className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
      
      {showDropdown && (query.trim().length > 0) && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg dark:bg-gray-800 max-h-96 overflow-auto"
        >
          {loading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Loading...
            </div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((token) => (
                <li
                  key={token.id}
                  onClick={() => handleSelect(token)}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <img
                    src={token.image}
                    alt={token.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <div className="font-medium dark:text-white">
                      {token.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {token.symbol}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
} 