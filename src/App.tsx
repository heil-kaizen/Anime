import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Loader from './components/Loader';
import Home from './pages/Home';
import AnimeDetail from './pages/AnimeDetail';
import ComingSoon from './pages/ComingSoon';
import About from './pages/About';
import AudioPlayer from './components/AudioPlayer';
import Arena from './pages/Arena';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-[100dvh] bg-sky-200 text-zinc-900 font-sans selection:bg-sky-400/50 selection:text-white flex flex-col">
      <ScrollToTop />
      <AudioPlayer />
      <Loader />
      <ParticleBackground />
      <Navbar />
      
      <main className="relative z-10 w-full flex-1 flex flex-col">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
          <Route path="/arena" element={<Arena />} />
          <Route path="/battles" element={<ComingSoon />} />
          <Route path="/about" element={<About />} />
          {/* Fallback routing */}
          <Route path="*" element={
            <div className="flex items-center justify-center h-[100dvh] w-full">
              <h1 className="text-zinc-500 font-mono">404 | NOT FOUND</h1>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
