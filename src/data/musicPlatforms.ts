export type MusicIcon = "youtube" | "youtube-music" | "spotify";

export interface Platform {
  name: string;
  href: string;
  color: string;
  icon: MusicIcon;
}

export const musicPlatforms: Platform[] = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@LOSETERNOSMUSIC",
    color: "#FF0000",
    icon: "youtube",
  },
  {
    name: "YouTube Music",
    href: "https://music.youtube.com/channel/UC5kXkpVz7MOq0n10nYCiMyw?si=bmzsP31_uv_oVDye",
    color: "#FF0000",
    icon: "youtube-music",
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/intl-es/artist/7kBCNjIotUqdeNfgWdQwtk?si=SOTc4B_2STiWXYFdqZUvdQ",
    color: "#1DB954",
    icon: "spotify",
  },
];
