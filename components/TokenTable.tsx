'use client';

import React from 'react';
import { Token } from '../types/token';

interface TokenTableProps {
  tokens: Token[];
  onRemove: (tokenId: string) => void;
}

export default function TokenTable({ tokens, onRemove }: TokenTableProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(marketCap);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Token</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">24h Change</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Market Cap</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {tokens.map((token) => (
            <tr key={token.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    src={token.image}
                    alt={token.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {token.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {token.symbol}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                {formatPrice(token.current_price)}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-right text-sm ${
                token.price_change_percentage_24h >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {formatPercentage(token.price_change_percentage_24h)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                {formatMarketCap(token.market_cap)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                <button
                  onClick={() => onRemove(token.id)}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {tokens.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No tokens in watchlist
        </div>
      )}
    </div>
  );
} 