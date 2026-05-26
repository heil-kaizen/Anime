import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Copy, Activity, Droplets, LineChart } from 'lucide-react';

export default function MainDashboard() {
  const ca = 'Ed8w9Zg7ZMkptF1Ju3YfWYNRLj6Fuy2j69KvpAzopump'; // Fallback token or empty string if you prefer, but I'll use a real one so it's not totally empty initially
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (ca) {
      fetchData(ca);
    }
  }, [ca]);

  const fetchData = async (address: string) => {
    if (!address) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/solanatracker/token?token=${address}`);
      const json = await res.json();
      
      if (json && json.token && json.pools && json.pools.length > 0) {
        // Solana Tracker response structure gives token and pools (DexScreener-like inside pools[0])
        setData({
          baseToken: {
            name: json.token.name,
            symbol: json.token.symbol,
            address: json.token.mint
          },
          info: {
            imageUrl: json.token.image
          },
          priceUsd: json.pools[0].price?.usd || 0,
          priceChange: {
            h24: json.events?.['24h']?.priceChangePercentage || 0
          },
          fdv: json.pools[0].marketCap?.usd || json.token.marketCap || 0,
          volume: {
            h24: json.events?.['24h']?.volume || 0
          },
          liquidity: {
            usd: json.pools[0].liquidity?.usd || 0
          }
        });
      } else {
        setData(null);
      }
    } catch (e) {
      console.error(e);
      setData(null);
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ca);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatMoney = (num: number) => {
    if (!num) return '$0.00';
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 via-sky-400 to-green-400"></div>

        {loading ? (
          <div className="h-40 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : data ? (
          <div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                {data.info?.imageUrl ? (
                  <img src={data.info.imageUrl} alt={data.baseToken.name} className="w-16 h-16 rounded-full border-2 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-full border-2 border-red-500/50 flex items-center justify-center bg-red-500/10 text-red-500 font-bold text-xl shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                    {data.baseToken.symbol?.[0]}
                  </div>
                )}
                <div>
                  <h2 className="text-3xl font-black italic text-white flex items-center gap-2">
                    {data.baseToken.name} <span className="text-red-500 text-lg opacity-80">{data.baseToken.symbol}</span>
                  </h2>
                  <div className="text-zinc-400 text-sm font-mono mt-1">MAIN COMMUNITY TOKEN</div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-xs font-bold text-zinc-500 tracking-wider">CONTRACT ADDRESS</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 py-2 px-4 rounded-xl text-sm font-medium text-zinc-300 transition-all hover:border-white/30"
                >
                  {copied ? (
                    <span className="text-emerald-400">Address Copied</span>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="font-mono">{ca.substring(0, 8)}...{ca.slice(-4)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-sky-50/50 backdrop-blur-md border border-sky-100 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
                <span className="text-xs text-sky-700 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <LineChart className="w-4 h-4 text-blue-500" />
                  Price USD
                </span>
                <span className="text-2xl font-mono font-bold text-blue-900 mb-1">
                  ${Number(data.priceUsd).toFixed(6)}
                </span>
                <span className={`text-xs font-bold font-mono ${data.priceChange.h24 >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {data.priceChange.h24 >= 0 ? '+' : ''}{data.priceChange.h24.toFixed(2)}% (24h)
                </span>
              </div>

              <div className="bg-sky-50/50 backdrop-blur-md border border-sky-100 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
                <span className="text-xs text-sky-700 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  Market Cap (FDV)
                </span>
                <span className="text-2xl font-mono font-bold text-blue-900 mb-1">
                  {formatMoney(data.fdv)}
                </span>
              </div>

              <div className="bg-sky-50/50 backdrop-blur-md border border-sky-100 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
                <span className="text-xs text-sky-700 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <LineChart className="w-4 h-4 text-indigo-500" />
                  24H Volume
                </span>
                <span className="text-2xl font-mono font-bold text-blue-900 mb-1">
                  {formatMoney(data.volume?.h24)}
                </span>
              </div>

              <div className="bg-sky-50/50 backdrop-blur-md border border-sky-100 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
                <span className="text-xs text-sky-700 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-500" />
                  Liquidity
                </span>
                <span className="text-2xl font-mono font-bold text-blue-900 mb-1">
                  {formatMoney(data.liquidity?.usd)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-32 flex items-center justify-center border border-dashed border-sky-300 rounded-2xl bg-white/50">
            <span className="text-sky-600 font-mono font-bold text-sm">No token data found.</span>
          </div>
        )}
      </motion.div>
    </section>
  );
}
