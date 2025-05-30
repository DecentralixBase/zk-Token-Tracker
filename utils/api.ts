import { Token, TokenResponse } from '../types/token';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export async function searchTokens(query: string): Promise<Token[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API_URL}/search?query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.coins.slice(0, 10).map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      image: coin.large,
      current_price: 0,
      price_change_percentage_24h: 0,
      market_cap: 0,
    }));
  } catch (error) {
    console.error('Error searching tokens:', error);
    return [];
  }
}

export async function getTokenData(tokenId: string): Promise<Token | null> {
  try {
    const response = await fetch(
      `${COINGECKO_API_URL}/coins/${tokenId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    const data: TokenResponse = await response.json();
    
    return {
      id: data.id,
      symbol: data.symbol.toUpperCase(),
      name: data.name,
      image: data.image.small,
      current_price: data.market_data.current_price.usd,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h,
      market_cap: data.market_data.market_cap.usd,
    };
  } catch (error) {
    console.error('Error fetching token data:', error);
    return null;
  }
}

export async function getTokensData(tokenIds: string[]): Promise<Token[]> {
  try {
    const tokens = await Promise.all(
      tokenIds.map((id) => getTokenData(id))
    );
    return tokens.filter((token): token is Token => token !== null);
  } catch (error) {
    console.error('Error fetching tokens data:', error);
    return [];
  }
}

export async function getTopGainers(limit: number = 10) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=price_change_percentage_24h_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching top gainers:', error);
    return [];
  }
} 