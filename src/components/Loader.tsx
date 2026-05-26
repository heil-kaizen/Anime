import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../store/useAppStore';
import { useEffect, useState } from 'react';

export default function Loader() {
  const { isLoading, setLoading, hasEntered, setHasEntered } = useAppStore();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowButton(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/loadingscreen%20background.webp')" }}
          />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/40 rounded-full blur-[120px] mix-blend-overlay pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/60 rounded-full blur-[100px] mix-blend-overlay pointer-events-none"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 text-center flex flex-col items-center"
          >
            <div className="relative mb-6">
               <img src="https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/logo.webp" alt="Logo" className="w-32 h-32 md:w-48 md:h-48 rounded-full mx-auto relative z-10 border-2 border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.4)] object-cover" />
            </div>
            
            <div className="relative mb-8">
              <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter text-blue-900 drop-shadow-md">
                ANIME<span className="text-blue-500">ARENA</span>
              </h1>
            </div>

            <div className="h-16 flex items-center justify-center">
              {!showButton ? (
                <div className="flex flex-col items-center">
                  <motion.div 
                    className="h-1 bg-blue-200 w-64 rounded-full overflow-hidden relative mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div 
                      className="absolute top-0 left-0 bottom-0 bg-blue-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                  </motion.div>
                  
                  <motion.p 
                    className="text-xs font-mono text-blue-800 uppercase tracking-[0.2em] font-bold"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Loading meme economy...
                  </motion.p>
                </div>
              ) : (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setHasEntered(true)}
                  className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-widest uppercase shadow-lg border border-transparent hover:shadow-xl"
                >
                  Enter Arena
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
