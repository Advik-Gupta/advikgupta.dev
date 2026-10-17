export type Freebie = {
  slug: string;
  name: string;
  blurb: string;
  deps: string[];
  files: string[];
  credit?: string;
};

export const FREEBIES: Freebie[] = [
  {
    slug: "road-journey",
    name: "Road Journey",
    blurb:
      "A winding road that draws itself as you scroll, with a little car driving between your milestones. Works with the page or any scroll container.",
    deps: [],
    files: [
      "RoadJourney/RoadJourney.tsx",
      "RoadJourney/RoadJourney.css",
      "RoadJourney/Example.tsx",
    ],
  },
  {
    slug: "preloader",
    name: "Preloader",
    blurb:
      "A loading screen with rotating highlighted words, popping photos, a counter and a curtain exit. Full screen, or contained inside any box.",
    deps: ["gsap", "@gsap/react"],
    files: [
      "Preloader/Preloader.tsx",
      "Preloader/Preloader.css",
      "Preloader/Example.tsx",
    ],
  },
  {
    slug: "wave-gallery",
    name: "Wave Gallery",
    blurb:
      "Photos riding along a wavy SVG path. Drag it, hover to slow it down, and it speeds up with your scroll.",
    deps: ["framer-motion"],
    files: [
      "WaveGallery/WaveGallery.tsx",
      "WaveGallery/WaveGallery.css",
      "WaveGallery/MarqueeAlongSvgPath.tsx",
      "WaveGallery/Example.tsx",
    ],
    credit:
      "The path marquee is adapted from Fancy Components by Daniel Petho (fancycomponents.dev).",
  },
  {
    slug: "slot-stats",
    name: "Slot Stats",
    blurb:
      "Stat tiles whose digits roll into place like a slot machine when they scroll into view. Pure CSS animation, no libraries.",
    deps: [],
    files: [
      "SlotStats/SlotStats.tsx",
      "SlotStats/SlotStats.css",
      "SlotStats/Example.tsx",
    ],
  },
  {
    slug: "stack-cards",
    name: "Stack Cards",
    blurb:
      "Sticky project cards that stack on top of each other, with the one underneath shrinking back and dimming as it gets covered.",
    deps: [],
    files: [
      "StackCards/StackCards.tsx",
      "StackCards/StackCards.css",
      "StackCards/Example.tsx",
    ],
  },
];
