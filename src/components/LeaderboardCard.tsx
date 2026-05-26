import { ArrowRight, Copy, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { AnimeData } from '../hooks/useAnimeData';
import { cn } from '../lib/utils';
import { useState, MouseEvent } from 'react';

export default function LeaderboardCard({ item, index }: { item: AnimeData; index: number; key?: string | number }) {
  const [copied, setCopied] = useState(false);

  const formatMoney = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${(num / 1e3).toFixed(2)}K`;
  };

  const formatHolders = (num: number) => {
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  const handleCopy = (e: MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(item.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-400 to-sky-400 rounded-2xl opacity-0 group-hover:opacity-30 transition duration-500 blur-md"></div>
      
      <Link to={`/anime/${item.id}`} className="relative block h-full bg-white/40 backdrop-blur-xl border border-white/50 hover:border-white rounded-2xl p-5 overflow-hidden transition-colors shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
        
        {/* Top Rank Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <div className="bg-white/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/60 flex items-center gap-1.5 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-mono font-bold text-yellow-600">{item.trendScore}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative w-20 h-28 rounded-lg overflow-hidden shrink-0 border border-sky-100 shadow-sm">
            <img 
              src={item.coverImage} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-white/90 rounded px-1.5 py-0.5 shadow-sm">
              <span className="text-[10px] font-bold text-yellow-500">★ {item.malScore}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 group-hover:bg-blue-500 group-hover:text-white transition-colors shadow-sm">
                  #{index + 1}
                </span>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 shadow-sm">
                  {item.symbol}
                </span>
              </div>
              <h3 className="text-lg font-bold text-blue-900 truncate leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="bg-white/40 rounded-lg p-2 backdrop-blur-sm border border-white/40">
                <p className="text-[10px] text-sky-800 uppercase font-bold mb-0.5">Market Cap</p>
                <p className="text-sm font-mono font-bold text-blue-900">{formatMoney(item.marketCap)}</p>
              </div>
              <div className="bg-white/40 rounded-lg p-2 backdrop-blur-sm border border-white/40">
                <p className="text-[10px] text-sky-800 uppercase font-bold mb-0.5">Holders</p>
                <p className="text-sm font-mono font-bold text-blue-900">{formatHolders(item.holders)}</p>
              </div>
              <div className="bg-white/40 rounded-lg p-2 backdrop-blur-sm border border-white/40">
                <p className="text-[10px] text-sky-800 uppercase font-bold mb-0.5">24h Vol</p>
                <p className="text-sm font-mono font-bold text-blue-900">{formatMoney(item.volume24h)}</p>
              </div>
              <div className="bg-white/40 rounded-lg p-2 backdrop-blur-sm border border-white/40">
                <p className="text-[10px] text-sky-800 uppercase font-bold mb-0.5">24h Gain</p>
                <p className={cn("text-sm font-mono font-bold", item.change24h >= 0 ? "text-emerald-600" : "text-rose-600")}>
                  {item.change24h >= 0 ? '+' : ''}{item.change24h.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-blue-600 border border-sky-200 transition-colors shadow-sm"
          >
            {copied ? (
              <span className="text-emerald-500">Copied!</span>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-mono">{item.contractAddress.substring(0,6)}...</span>
              </>
            )}
          </button>
        </div>

      </Link>
    </motion.div>
  );
}
