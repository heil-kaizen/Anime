export interface AnimeBase {
  id: string;
  title: string;
  symbol: string;
  coverImage: string;
  bannerImage: string;
  malScore: number;
  episodes: number;
  studios: string[];
  genres: string[];
  contractAddress: string;
  trendScore: number;
}

export const ANIME_CONFIG: AnimeBase[] = [
  {
    id: "one-piece",
    title: "One Piece",
    symbol: "$OP",
    coverImage: "https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/onepiece.webp",
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg",
    malScore: 8.7,
    episodes: 1100,
    studios: ["Toei Animation"],
    genres: ["Action", "Adventure", "Fantasy"],
    contractAddress: "4CTVAmx83CgYbGKpvGLm3sNyu9UsGhJWbre7aYZQpump",
    trendScore: 98
  },
  {
    id: "naruto",
    title: "NARUTO",
    symbol: "$NRT",
    coverImage: "https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/NarutoCover.webp",
    bannerImage: "https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/naruto-background.webp",
    malScore: 8.0,
    episodes: 220,
    studios: ["Studio Pierrot"],
    genres: ["Action", "Adventure", "Fantasy"],
    contractAddress: "BLHntfy7ke1u9j3ZmQFR44vXEfFS9XTBaYz3txYYpump",
    trendScore: 88
  },
  {
    id: "dragon-ball-z",
    title: "Dragon Ball Z",
    symbol: "$DBZ",
    coverImage: "https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/dbzcover.webp",
    bannerImage: "https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/dbz-background.webp",
    malScore: 8.1,
    episodes: 291,
    studios: ["Toei Animation"],
    genres: ["Action", "Adventure", "Sci-Fi"],
    contractAddress: "PLACEHOLDER_DBZ",
    trendScore: 92
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    symbol: "$JJK",
    coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg",
    bannerImage: "https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/jjk-background.webp",
    malScore: 8.6,
    episodes: 47,
    studios: ["MAPPA"],
    genres: ["Action", "Dark Fantasy", "Supernatural"],
    contractAddress: "PLACEHOLDER_JJK",
    trendScore: 95
  },
  {
    id: "my-hero-academia",
    title: "My Hero Academia",
    symbol: "$MHA",
    coverImage: "https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/MHAcover.webp",
    bannerImage: "https://raw.githubusercontent.com/heil-kaizen/AnimeWar/main/assets/MHA-background.webp",
    malScore: 7.9,
    episodes: 138,
    studios: ["Bones"],
    genres: ["Action", "Adventure", "Comedy"],
    contractAddress: "PLACEHOLDER_MHA",
    trendScore: 82
  }
];
