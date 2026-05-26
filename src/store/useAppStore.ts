import { create } from 'zustand';

interface AppState {
  soundEnabled: boolean;
  toggleSound: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  hasEntered: boolean;
  setHasEntered: (entered: boolean) => void;
  currentTrackIndex: number;
  nextTrack: () => void;
  prevTrack: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  soundEnabled: true,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  hasEntered: false,
  setHasEntered: (entered) => set({ hasEntered: entered }),
  currentTrackIndex: 0,
  nextTrack: () => set((state) => ({ currentTrackIndex: (state.currentTrackIndex + 1) % 2 })),
  prevTrack: () => set((state) => ({ currentTrackIndex: (state.currentTrackIndex - 1 + 2) % 2 })),
}));
