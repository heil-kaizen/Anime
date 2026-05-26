import { motion } from 'motion/react';
import { useAnimeData } from '../hooks/useAnimeData';

export default function TrendingTicker() {
  const { data: tickerData, loading } = useAnimeData();
  const formatMoney = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${(num / 1e3).toFixed(2)}K`;
  };

  const tickerItems = [...tickerData, ...tickerData];

  return (
    <div className="w-full bg-white/30 border-y border-white/40 backdrop-blur-xl overflow-hidden flex h-12 items-center relative z-20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white/30 backdrop-blur-md to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/30 backdrop-blur-md to-transparent z-10"></div>
      
      {loading ? (
        <div className="w-full flex justify-center text-xs text-sky-600 font-mono tracking-widest uppercase font-bold">
          SYNCING...
        </div>
      ) : tickerItems.length === 0 ? (
        <div className="w-full flex justify-center text-xs text-sky-600 font-mono tracking-widest uppercase font-bold">
          Live Data Stream Offline
        </div>
      ) : (
        <motion.div 
          className="flex whitespace-nowrap min-w-max"
          animate={{ x: [0, "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {tickerItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex items-center space-x-4 px-8 border-r border-sky-100">
              <div className="flex items-center gap-2">
                <img src={item.coverImage} alt={item.title} className="w-6 h-6 rounded-full object-cover shadow-sm" />
                <span className="font-bold text-blue-900 text-sm">{item.symbol}</span>
              </div>
              <span className="font-mono text-sm font-bold text-sky-700">${item.price.toFixed(2)}</span>
              <span className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded shadow-sm ${item.change24h >= 0 ? 'text-emerald-600 bg-emerald-100' : 'text-rose-600 bg-rose-100'}`}>
                {item.change24h >= 0 ? '+' : ''}{item.change24h.toFixed(2)}%
              </span>
              <span className="text-xs text-sky-600 font-mono font-bold tracking-wider ml-2">MC: {formatMoney(item.marketCap)}</span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
