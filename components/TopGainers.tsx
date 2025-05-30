import React, { useEffect, useState } from 'react';
import { getTopGainers } from '../utils/api';

export default function TopGainers() {
  const [gainers, setGainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGainers() {
      setLoading(true);
      const data = await getTopGainers(8);
      setGainers(data);
      setLoading(false);
    }
    fetchGainers();
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
        🚀 Top Gainers (24h)
      </h2>
      {loading ? (
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {gainers.map((coin) => (
            <div
              key={coin.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-200"
            >
              <img src={coin.image} alt={coin.name} className="w-12 h-12 mb-2" />
              <div className="font-semibold text-gray-900 dark:text-white text-lg">
                {coin.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {coin.symbol.toUpperCase()}
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                ${coin.current_price.toLocaleString()}
              </div>
              <div className={`mt-1 text-sm font-bold ${coin.price_change_percentage_24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
              >
                {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="mt-1 text-xs text-gray-400">MCap: ${coin.market_cap.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 