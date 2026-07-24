export type SocialIcon = "instagram" | "facebook" | "tiktok";

export interface SocialLink {
  name: string;
  href: string;
  color: string;
  icon: SocialIcon;
}

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/los_eternos.oficial/",
    color: "#E4405F",
    icon: "instagram",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/LosEternoss",
    color: "#1877F2",
    icon: "facebook",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@loseternoss",
    color: "#00F2EA",
    icon: "tiktok",
  },
];
