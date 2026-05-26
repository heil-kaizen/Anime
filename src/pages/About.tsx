import { motion } from 'motion/react';
import { Sparkles, Info, Users, Swords, Activity, Zap, TrendingUp, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="flex-1 w-full pt-24 pb-24 px-6 relative">
      <div 
        className="fixed inset-0 z-[-2] bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/mainbackground.webp')" }}
      />
      <div className="fixed inset-0 bg-white/30 backdrop-blur-md pointer-events-none z-[-1]"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-200 mx-auto mb-6 shadow-sm transform rotate-3">
            <Info className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-blue-900 mb-6 drop-shadow-md">
            ABOUT <span className="text-blue-500">ANIMEARENA</span>
          </h1>
          <p className="text-xl md:text-2xl text-sky-800 font-bold leading-relaxed max-w-3xl mx-auto">
            AnimeArena is a fandom-powered anime market ecosystem built on Solana.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Intro Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
          >
            <p className="text-sky-900 font-medium text-lg leading-relaxed mb-8">
              Instead of betting on sports teams, communities rally behind the anime, characters, and universes they love most.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <p className="font-bold text-blue-900 text-lg">Every anime has its own community.</p>
              </div>
              <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
                <TrendingUp className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
                <p className="font-bold text-blue-900 text-lg">Every fandom has its own momentum.</p>
              </div>
              <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
                <Swords className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
                <p className="font-bold text-blue-900 text-lg">Every battle is driven by the fans.</p>
              </div>
            </div>
          </motion.section>

          {/* Features Grid */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
              <h3 className="text-2xl font-black italic text-blue-900 mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-blue-600" /> AnimeArena Combines:
              </h3>
              <ul className="space-y-4">
                {[
                  'anime culture',
                  'social competition',
                  'live market energy',
                  'community rankings',
                  'fandom wars'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sky-800 font-bold text-lg">
                    <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600 font-bold border border-blue-200">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
              <h3 className="text-2xl font-black italic text-indigo-900 mb-6 flex items-center gap-3">
                <Activity className="w-6 h-6 text-indigo-600" /> Live Analytics:
              </h3>
              <p className="text-sky-900 font-medium mb-6">
                The project pulls anime metadata and ratings from platforms like MyAnimeList and IMDb while integrating live Solana token analytics such as:
              </p>
              <ul className="grid grid-cols-2 gap-4">
                {['price', 'market cap', 'trading volume', 'holder activity'].map((item, i) => (
                  <li key={i} className="bg-white/40 border border-white/40 rounded-xl p-4 text-center font-mono text-indigo-700 font-bold text-sm shadow-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
          >
            <p className="text-sky-900 text-lg font-medium leading-relaxed mb-8">
              Users can explore trending anime communities, track live token activity, support favorite series, and participate in evolving anime battles across the platform.
              AnimeArena is designed as an evolving ecosystem.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-500" /> Initial Releases Focus On:
                </h4>
                <ul className="space-y-2">
                  {[
                    'anime profile pages',
                    'live token tracking',
                    'trending leaderboards',
                    'fandom discovery'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sky-700 font-bold">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" /> Future Updates May Introduce:
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {[
                    'tournament brackets',
                    'character battles',
                    'seasonal events',
                    'community rankings',
                    'collection systems',
                    'social features',
                    'fandom achievements',
                    'anime-vs-anime arenas'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sky-700 font-bold text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Footer Call to Action */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center py-12"
          >
            <p className="text-xl text-sky-800 font-bold mb-8 max-w-2xl mx-auto">
              This project is built for anime fans, meme culture, and internet communities that want to turn fandom energy into a live competitive experience.
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center gap-6">
              <h2 className="text-3xl font-black italic text-blue-600 tracking-wider">
                SUPPORT THE ANIME.<br />JOIN THE ARENA.
              </h2>
              <Link to="/arena" className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center shadow-md">
                Enter Arena
              </Link>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
