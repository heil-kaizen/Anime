import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

const TRACKS = [
  "https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/Parasyte%20-%20Next%20to%20You%20(Yousko%20Remix).mp3",
  "https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/Death%20Note%20OST%201%20-%2003%20Light's%20Theme.mp3"
];

export default function AudioPlayer() {
  const { soundEnabled, hasEntered, currentTrackIndex, nextTrack } = useAppStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(TRACKS[currentTrackIndex]);
      audioRef.current.volume = 0.05;
      audioRef.current.addEventListener('ended', nextTrack);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', nextTrack);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = TRACKS[currentTrackIndex];
      audioRef.current.volume = 0.05;
      if (hasEntered && soundEnabled) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (hasEntered && soundEnabled) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [soundEnabled, hasEntered]);

  return null;
}
