import React, { useState, useEffect } from 'react';
import { Token } from '../types/token';
import { getTokensData } from '../utils/api';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Token[]>([]);
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load watchlist IDs from localStorage on mount
  useEffect(() => {
    const savedIds = localStorage.getItem('watchlist');
    if (savedIds) {
      setWatchlistIds(JSON.parse(savedIds));
    }
    setLoading(false);
  }, []);

  // Update localStorage when watchlist changes
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlistIds));
  }, [watchlistIds]);

  // Fetch token data when watchlistIds changes
  useEffect(() => {
    const fetchTokens = async () => {
      if (watchlistIds.length > 0) {
        setLoading(true);
        const tokens = await getTokensData(watchlistIds);
        setWatchlist(tokens);
        setLoading(false);
      } else {
        setWatchlist([]);
      }
    };

    fetchTokens();
  }, [watchlistIds]);

  const addToken = (token: Token) => {
    if (!watchlistIds.includes(token.id)) {
      setWatchlistIds([...watchlistIds, token.id]);
    }
  };

  const removeToken = (tokenId: string) => {
    setWatchlistIds(watchlistIds.filter((id) => id !== tokenId));
  };

  const isInWatchlist = (tokenId: string) => {
    return watchlistIds.includes(tokenId);
  };

  return {
    watchlist,
    loading,
    addToken,
    removeToken,
    isInWatchlist,
  };
} 