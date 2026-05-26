import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Swords, Info, Volume2, VolumeX } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function Navbar() {
  const { soundEnabled, toggleSound, nextTrack, prevTrack } = useAppStore();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Arena', path: '/arena', icon: TrendingUp },
    { name: 'Battles', path: '/battles', icon: Swords },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-white/60 backdrop-blur-xl border-b border-white/40 hidden md:block shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full overflow-hidden relative border border-blue-400/50 flex items-center justify-center bg-white shrink-0 shadow-sm">
               <img src="https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/logo.webp" alt="AnimeArena Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-black text-xl tracking-tight text-blue-900 italic drop-shadow-sm">
              Anime<span className="text-blue-500">Arena</span>
            </span>
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "relative flex items-center gap-2 text-sm font-bold transition-colors hover:text-blue-600 pb-1 group",
                    isActive ? "text-blue-700" : "text-sky-800"
                  )}
                >
                  <Icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive && "text-blue-500")} />
                  {item.name}
                  {isActive && (
                    <motion.div 
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[26px] left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-t-full shadow-sm"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-white/50 rounded-full px-2 py-1 border border-white/60 shadow-sm">
              <button 
                onClick={prevTrack}
                className="p-1.5 text-sky-800 hover:text-blue-600 transition-colors rounded-full hover:bg-white/50"
                title="Previous Track"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
              </button>
              <button 
                onClick={toggleSound}
                className="p-1.5 text-sky-800 hover:text-blue-600 transition-colors rounded-full hover:bg-white/50"
                title="Toggle Sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-500" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button 
                onClick={nextTrack}
                className="p-1.5 text-sky-800 hover:text-blue-600 transition-colors rounded-full hover:bg-white/50"
                title="Next Track"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
              </button>
            </div>
            <a 
              href="https://x.com/home" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-sky-200 hover:bg-sky-50 shadow-sm transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-blue-600" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full z-40 bg-white/90 backdrop-blur-xl border-t border-sky-100 pb-safe shadow-lg">
        <div className="flex items-center justify-around h-16 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 relative",
                  isActive ? "text-blue-600" : "text-sky-700"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "drop-shadow-sm")} />
                <span className="text-[10px] font-bold tracking-wide">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="mobile-indicator"
                    className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gradient-to-r from-blue-400 to-blue-500 rounded-b-full shadow-sm"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
