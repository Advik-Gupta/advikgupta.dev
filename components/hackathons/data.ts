export type Hackathon = {
  slug: string;
  project: string;
  event: string;
  placement: string;
  year: string;
  duration: string;
  team: string;
  hook: string;
  brief: string;
  built: string;
  stack: string[];
  links: { label: string; href: string }[];
  timeline: { time: string; text: string }[];
  gallery: string[];
};

export const HACKATHONS: Hackathon[] = [
  {
    slug: "kodesphere",
    project: "KodeSphere",
    event: "CodeChef-VIT Internal Hackathon",
    placement: "Winner",
    year: "2025",
    duration: "48h",
    team: "Placeholder: team of 4",
    hook: "Push code, get a running app. Built against the clock, and it won.",
    brief:
      "Placeholder: the problem statement or theme you were given, in a sentence or two.",
    built:
      "A cloud-native deployment platform with automated container provisioning and build pipelines. Placeholder: add what made it stand out to the judges.",
    stack: ["Docker", "CI/CD", "Node.js", "Placeholder"],
    links: [
      { label: "Repository", href: "#" },
      { label: "Demo video", href: "#" },
    ],
    timeline: [
      {
        time: "00:00",
        text: "Placeholder: kickoff, the theme drops and the team huddles.",
      },
      {
        time: "03:00",
        text: "Placeholder: idea locked in, architecture sketched on a whiteboard.",
      },
      {
        time: "09:00",
        text: "Placeholder: first container builds and deploys end to end.",
      },
      {
        time: "18:00",
        text: "Placeholder: the 3am bug that nearly ended everything.",
      },
      {
        time: "30:00",
        text: "Placeholder: dashboard and build logs come together.",
      },
      {
        time: "42:00",
        text: "Placeholder: polish, pitch deck and demo rehearsal.",
      },
      { time: "47:59", text: "Placeholder: submitted with seconds to spare." },
    ],
    gallery: [
      "Placeholder · team photo",
      "Placeholder · the demo",
      "Placeholder · 3am whiteboard",
      "Placeholder · the win",
    ],
  },
];

export const UPCOMING = 2;

export const SCOREBOARD = [
  { label: "Wins", value: "01" },
  { label: "Hackathons", value: "00", placeholder: true },
  { label: "Hours awake", value: "48", placeholder: true },
];
