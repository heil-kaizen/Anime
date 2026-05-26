import { useState, useEffect } from 'react';
import { ANIME_CONFIG, AnimeBase } from '../config/anime';

export interface AnimeData extends AnimeBase {
  price: number;
  marketCap: number;
  volume24h: number;
  liquidity: number;
  holders: number; // mock fallback if not provided
  change24h: number; // mock fallback initially
}

export function useAnimeData() {
  const [data, setData] = useState<AnimeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const enriched: AnimeData[] = [];
        
        for (const anime of ANIME_CONFIG) {
          try {
            if (anime.contractAddress.startsWith('PLACEHOLDER')) {
              enriched.push({
                ...anime,
                price: 0,
                marketCap: 0,
                liquidity: 0,
                volume24h: 0,
                holders: 0,
                change24h: 0
              });
              continue;
            }
            
            const res = await fetch(`/api/solanatracker/token?token=${anime.contractAddress}`);
            
            if (!res.ok) {
               throw new Error(`HTTP ${res.status}`);
            }
            
            const solData = await res.json();
            
            if (solData && solData.token) {
              enriched.push({
                ...anime,
                price: solData.pools?.[0]?.price?.usd || 0,
                marketCap: solData.pools?.[0]?.marketCap?.usd || solData.token.marketCap || 0,
                liquidity: solData.pools?.[0]?.liquidity?.usd || 0,
                volume24h: solData.events?.['24h']?.volume || 0,
                holders: 0,
                change24h: solData.events?.['24h']?.priceChangePercentage || 0
              });
            } else {
              throw new Error("Invalid format");
            }
          } catch (err) {
            console.error(`Failed to fetch for ${anime.title}`, err);
            enriched.push({
              ...anime,
              price: 0,
              marketCap: 0,
              liquidity: 0,
              volume24h: 0,
              holders: 0,
              change24h: 0
            });
          }
          
          // Small delay to prevent rate limit on free tier APIs
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        setData(enriched);
      } catch (err) {
        console.error("Error fetching all anime data", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAll();
  }, []);

  return { data, loading };
}
