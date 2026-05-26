import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Copy, Share2, Star, TrendingUp, Users, Activity } from 'lucide-react';
import { useAnimeData } from '../hooks/useAnimeData';
import { useState } from 'react';

export default function AnimeDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: animeData, loading } = useAnimeData();
  const anime = animeData.find(a => a.id === id);
  const [copied, setCopied] = useState(false);

  if (loading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <h1 className="text-zinc-500 font-mono text-xl animate-pulse">SYNCING DATA...</h1>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <h1 className="text-zinc-500 font-mono text-xl">ANIME_DATA_NOT_FOUND</h1>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(anime.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatMoney = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${(num / 1e3).toFixed(2)}K`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 w-full pb-24 md:pb-10"
    >
      {/* Cinematic Banner */}
      <div className="relative h-[40vh] md:h-[50vh] w-full bg-white">
        <div className="absolute inset-0 z-0">
          <img 
            src={anime.bannerImage || anime.coverImage} 
            alt={anime.title} 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-200 via-sky-100/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-sky-200 via-transparent to-transparent"></div>
        </div>
        
        <div className="absolute top-24 left-6 z-10">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sky-800 hover:text-blue-600 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-sky-200 hover:bg-white transition-colors text-sm font-bold shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Arenas
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 -mt-24 md:-mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Anime Info */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 to-sky-400"></div>
              
              <div className="flex gap-6 mb-6">
                <div className="w-28 h-40 rounded-xl overflow-hidden shrink-0 border border-sky-100 shadow-md">
                  <img src={anime.coverImage} alt={anime.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-end py-2">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-xs font-bold mb-2 border border-blue-200 w-fit">
                    <TrendingUp className="w-3 h-3" /> RANK #{animeData.findIndex(a => a.id === anime.id) + 1}
                  </div>
                  <h1 className="text-2xl font-black italic leading-tight text-blue-900 mb-1">
                    {anime.title}
                  </h1>
                  <div className="flex items-center gap-2">
                     <span className="text-lg font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {anime.symbol}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                 <button 
                    onClick={handleCopy}
                    className="flex-1 flex items-center justify-center gap-2 bg-sky-50 hover:bg-sky-100 border border-sky-200 py-2.5 rounded-xl text-sm font-bold text-blue-600 transition-all shadow-sm"
                  >
                    {copied ? <span className="text-emerald-500">Address Copied</span> : <span className="font-mono text-[10px] sm:text-xs">{anime.contractAddress}</span>}
                 </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-sky-100">
                  <span className="text-sky-700 text-sm font-bold flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500" /> MAL Score</span>
                  <span className="text-blue-900 font-bold">{anime.malScore}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-sky-100">
                  <span className="text-sky-700 text-sm font-bold flex items-center gap-2"><Users className="w-4 h-4 text-indigo-500" /> Token Holders</span>
                  <span className="text-blue-900 font-bold font-mono">{anime.holders.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-sky-100">
                  <span className="text-sky-700 text-sm font-bold flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-500" /> Trend Score</span>
                  <span className="text-blue-900 font-bold">{anime.trendScore}/100</span>
                </div>
                {anime.episodes && (
                  <div className="flex justify-between items-center py-3 border-b border-sky-100">
                    <span className="text-sky-700 text-sm font-bold">Episodes</span>
                    <span className="text-blue-900 font-bold">{anime.episodes}</span>
                  </div>
                )}
                <div className="pt-2">
                   <div className="flex flex-wrap gap-2">
                     {anime.genres?.map(g => (
                       <span key={g} className="px-2.5 py-1 rounded-full bg-sky-100 text-xs text-sky-800 font-bold border border-sky-200">{g}</span>
                     ))}
                   </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Market Data & Chart */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { label: 'PRICE', value: `$${anime.price.toFixed(4)}`, sub: `${anime.change24h >= 0 ? '+' : ''}${anime.change24h.toFixed(2)}%`, up: anime.change24h >= 0 },
                { label: 'MARKET CAP', value: formatMoney(anime.marketCap), sub: 'Fully Diluted' },
                { label: '24H VOLUME', value: formatMoney(anime.volume24h), sub: 'Across DEXs' },
                { label: 'LIQUIDITY', value: formatMoney(anime.marketCap * 0.1), sub: 'Raydium/Orca' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-4 flex flex-col justify-center shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                   <span className="text-[10px] sm:text-xs text-sky-800 font-bold uppercase tracking-wider mb-1">{stat.label}</span>
                   <span className="text-lg sm:text-2xl font-mono font-bold text-blue-900 mb-1">{stat.value}</span>
                   {stat.sub && (
                     <span className={`text-[10px] sm:text-xs font-bold font-mono ${stat.up !== undefined ? (stat.up ? 'text-emerald-600' : 'text-rose-600') : 'text-sky-700'}`}>
                       {stat.sub}
                     </span>
                   )}
                </div>
              ))}
            </motion.div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
