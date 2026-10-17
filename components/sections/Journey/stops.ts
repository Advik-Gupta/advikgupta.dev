export type Stop = {
  kicker: string;
  title: string;
  note: string;
  kind?: "roadwork" | "future";
};

export const STOPS: Stop[] = [
  {
    kicker: "Stop 01",
    title: "Hello, world",
    note: "Started coding in 10th grade. It felt like a superpower: if I could imagine it, I could build it.",
  },
  {
    kicker: "Stop 02",
    title: "First paycheck",
    note: "Built a site for a friend for my first ₹5K, then landed ₹15K. Bought my own phone at 15.",
  },
  {
    kicker: "Road work",
    title: "JEE prep",
    note: "Oh well. The laptop went into storage and the road closed for a while.",
    kind: "roadwork",
  },
  {
    kicker: "Stop 03",
    title: "VIT Vellore",
    note: "New college, new city, starting from scratch. Got back to code and started building right away.",
  },
  {
    kicker: "Stop 04",
    title: "CodeChef-VIT",
    note: "Got into one of the top coding clubs on campus and started working on much bigger projects.",
  },
  {
    kicker: "Stop 05",
    title: "Papers",
    note: "One of the biggest projects I've worked on. Taught me the most about teams and building together.",
  },
  {
    kicker: "Stop 06",
    title: "₹1 lakh+",
    note: "Crossed a lakh in revenue from client projects. Treated myself to some cool stuff, obviously.",
  },
  {
    kicker: "Next exit",
    title: "Cooler stuff",
    note: "Working on it right now. Buckle up, this one leaves the road.",
    kind: "future",
  },
];
