import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAnimeData } from '../hooks/useAnimeData';
import LeaderboardCard from '../components/LeaderboardCard';

export default function Arena() {
  const { data: animeData } = useAnimeData();
  
  return (
    <div className="pt-20 pb-24 md:pb-0 flex-1 w-full relative">
      <div 
        className="fixed inset-0 z-[-2] bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/mainbackground.webp')" }}
      />
      <div className="fixed inset-0 bg-white/20 backdrop-blur-sm pointer-events-none z-[-1]"></div>
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tight text-blue-900 mb-2 flex items-center gap-3">
              LIVE ARENAS
            </h2>
            <p className="text-sky-800 font-bold text-lg">All active anime fan markets.</p>
          </div>
          <Link to="/" className="text-blue-600 hover:text-blue-500 font-bold transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animeData.length === 0 ? (
            <div className="col-span-full h-40 bg-white/50 backdrop-blur-md border border-sky-100 rounded-2xl flex items-center justify-center text-blue-600 font-mono italic shadow-sm">
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
