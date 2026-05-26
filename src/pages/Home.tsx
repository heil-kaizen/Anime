import { motion } from 'motion/react';
import { ArrowRight, Trophy, Users } from 'lucide-react';
import { useAnimeData } from '../hooks/useAnimeData';
import LeaderboardCard from '../components/LeaderboardCard';
import TrendingTicker from '../components/TrendingTicker';
import MainDashboard from '../components/MainDashboard';

export default function Home() {
  const { data: animeData } = useAnimeData();
  
  return (
    <div className="pt-20 pb-24 md:pb-0 flex-1 w-full relative">
      <div 
        className="fixed inset-0 z-[-2] bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/mainbackground.webp')" }}
      />
      
      <MainDashboard />

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 overflow-hidden flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-white/80 text-sky-900 text-sm font-semibold tracking-wide mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            OUR MAIN TOKEN IS LIVE
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-blue-900 mb-6 leading-[0.9] drop-shadow-sm">
            WELCOME TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500">
              ANIME ARENA
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-sky-900 max-w-2xl mx-auto mb-10 leading-relaxed font-bold">
            Track live stats, token momentum, and community power. Back your favorite anime in the ultimate meme economy arena.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#live-arenas" className="w-full sm:w-auto h-14 px-8 rounded-full bg-white text-blue-600 font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 group">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Explore Arenas
            </a>
            <a href="https://x.com/home" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto h-14 px-8 rounded-full bg-sky-500/20 hover:bg-sky-500/30 border border-white/40 text-blue-900 font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2 backdrop-blur-sm">
              <Users className="w-5 h-5 text-blue-600" />
              Join Community
            </a>
          </div>
        </motion.div>

        {/* Hero decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-200/50 rounded-full blur-[120px] -z-10 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/40 rounded-full blur-[100px] -z-10 mix-blend-overlay pointer-events-none"></div>
      </section>

      <TrendingTicker />

      {/* Top Anime Leaderboard */}
      <section id="live-arenas" className="px-8 py-16 max-w-7xl mx-auto mt-12 mb-20 bg-white/30 backdrop-blur-xl rounded-3xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black italic tracking-tight text-blue-900 mb-2 flex items-center gap-3">
              LIVE ARENAS
              <div className="h-1 flex-1 bg-gradient-to-r from-blue-300 to-transparent rounded-full min-w-[50px] md:min-w-[200px]"></div>
            </h2>
            <p className="text-sky-800 font-medium font-bold">Top trending tokens across all major fandoms.</p>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-blue-600 hover:text-blue-500 font-bold transition-colors group">
            View Full Board 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animeData.length === 0 ? (
            <div className="col-span-full h-40 bg-white/50 backdrop-blur-md border border-white/50 rounded-2xl flex items-center justify-center text-blue-600 font-mono italic shadow-sm">
              Awaiting Next Season Data...
            </div>
          ) : (
            animeData.map((item, index) => (
              <LeaderboardCard key={item.id} item={item} index={index} />
            ))
          )}
        </div>
      </section>

    </div>
  );
}
