import { motion } from 'motion/react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function ComingSoon() {
  const location = useLocation();
  const pageName = location.pathname.substring(1) || 'Page';

  return (
    <div className="flex-1 w-full pt-20 pb-24 md:pb-0 flex items-center justify-center -mt-20 relative">
      <div 
        className="fixed inset-0 z-[-2] bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/mainbackground.webp')" }}
      />
      <div className="fixed inset-0 bg-white/30 backdrop-blur-md pointer-events-none z-[-1]"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-2xl mx-auto"
      >
        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-200 mb-8 shadow-sm">
          <Sparkles className="w-10 h-10 text-blue-500" />
        </div>

        <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter text-blue-900 mb-6 drop-shadow-md capitalize">
          {pageName} <span className="text-blue-500">Coming Soon</span>
        </h1>
        
        <p className="text-sky-800 font-bold text-lg mb-10 max-w-lg leading-relaxed">
           {pageName === 'about'
             ? "AnimeArena is the premier platform where fandom battles meet extreme meme economies. We're finalizing our mission statement — be ready."
             : "Our team of elite weeaboos is working tirelessly in the hyperbolic time chamber to bring this feature to life."}
        </p>

        <Link 
          to="/" 
          className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all hover:scale-105 shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Arena
        </Link>
      </motion.div>
    </div>
  );
}
