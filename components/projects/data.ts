export type GalleryItem = {
  src?: string;
  caption: string;
  shape: "wide" | "tall" | "square";
};

export type Project = {
  slug: string;
  title: string;
  short: string;
  year: string;
  role: string;
  hook: string;
  summary: string;
  stack: string[];
  links: { label: string; href: string }[];
  cover?: string;
  stats: { value: string; label: string }[];
  contribution: string[];
  learnings: string;
  gallery: GalleryItem[];
};

export const PROJECTS: Project[] = [
  {
    slug: "papers",
    title: "Papers by CodeChef-VIT",
    short: "Papers",
    year: "2025",
    role: "Core maintainer · Full-stack",
    hook: "Two million visits and counting.",
    summary:
      "An open-source platform giving VIT students access to previous years' question papers. Placeholder: a couple of lines on why it exists and who uses it.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Gemini API", "Tailwind CSS"],
    links: [
      { label: "Live site", href: "https://www.papers.codechefvit.com/" },
      {
        label: "Repository",
        href: "https://github.com/CodeChefVIT/papers-codechef",
      },
    ],
    cover: "/projects/papers/cover.jpg",
    stats: [
      { value: "2M+", label: "Visits" },
      { value: "00", label: "Placeholder stat" },
      { value: "00", label: "Placeholder stat" },
    ],
    contribution: [
      "Placeholder: the biggest thing you built or owned on this project.",
      "Placeholder: a second contribution, ideally with a number attached.",
      "Placeholder: something about reviews, mentoring or working with the team.",
      "Placeholder: one more detail worth bragging about.",
    ],
    learnings:
      "Placeholder: what was hard, what you'd do differently, and what this project taught you about building with a team.",
    gallery: [
      {
        src: "/projects/papers/cover.jpg",
        caption: "Home page",
        shape: "wide",
      },
      { caption: "Placeholder · admin dashboard", shape: "square" },
      { caption: "Placeholder · mobile view", shape: "tall" },
      { caption: "Placeholder · upload flow", shape: "square" },
      { caption: "Placeholder · paper viewer", shape: "wide" },
      { caption: "Placeholder · analytics", shape: "square" },
    ],
  },
];

export const UPCOMING = 2;
