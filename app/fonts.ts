import {
  Crimson_Pro,
  Pirata_One,
  Press_Start_2P,
  Rajdhani,
  Share_Tech_Mono,
  VT323,
} from "next/font/google";

export const rajdhani = Rajdhani({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech",
  display: "swap",
});

// world-specific fonts skip preload — only the sea/game pages render them
export const pirataOne = Pirata_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pirata",
  display: "swap",
  preload: false,
});

export const crimsonPro = Crimson_Pro({
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
  preload: false,
});

export const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
  preload: false,
});

export const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  rajdhani.variable,
  shareTechMono.variable,
  pirataOne.variable,
  crimsonPro.variable,
  pressStart2P.variable,
  vt323.variable,
].join(" ");
