export type Project = {
  title: string;
  year: string;
  hook: string;
  story: string;
  tags: string[];
  links: { label: string; href: string }[];
  tone: "ink" | "cream" | "orange" | "soft";
};

export const PROJECTS: Project[] = [
  {
    title: "Papers by CodeChef-VIT",
    year: "2025",
    hook: "Two million visits and counting.",
    story:
      "Where 40,000+ VIT students find past exam papers. I worked heavily on the admin portal and restructured the Gemini pipeline that reads every uploaded paper, so 2,000+ papers stay organised without anyone tagging them by hand.",
    tags: ["Next.js", "MongoDB", "Gemini API"],
    links: [
      { label: "Live", href: "https://www.papers.codechefvit.com/" },
      { label: "Repo", href: "https://github.com/CodeChefVIT/papers-codechef" },
    ],
    tone: "ink",
  },
  {
    title: "Railway Maintenance Platform",
    year: "2026",
    hook: "From inbox chaos to one record per issue.",
    story:
      "Maintenance reports used to live in email threads. Now they go into a Go and PostgreSQL system with Redis on the hot paths, RBAC, JWT sessions and an audit trail nobody can rewrite.",
    tags: ["Go", "PostgreSQL", "Redis", "React"],
    links: [
      {
        label: "Repo",
        href: "https://github.com/Advik-Gupta/Railway-Software",
      },
    ],
    tone: "orange",
  },
  {
    title: "Mikon",
    year: "2026",
    hook: "A training app that knows which muscles are cooked.",
    story:
      "Build programs across lifting, calisthenics, plyometrics, cardio and sport, with fatigue and volume tracked on every muscle as you plan. A drag and drop builder, 900+ exercises, a phone-first workout logger and imports from Strong and Hevy.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Web Push"],
    links: [
      { label: "Live", href: "https://mikon.advikgupta.dev" },
      { label: "Repo", href: "https://github.com/Advik-Gupta/mikon" },
    ],
    tone: "soft",
  },
  {
    title: "Blast Radius",
    year: "2026",
    hook: "Third place at the hackathon.",
    story:
      "Maps every function in a repository so new developers can explore huge codebases fast, with a DevOps view, schema explorer and Git backups in one retro, game-inspired interface. Built in a single hackathon.",
    tags: ["TypeScript", "tree-sitter", "D3", "VS Code API"],
    links: [
      { label: "Repo", href: "https://github.com/Advik-Gupta/blast-radius" },
    ],
    tone: "ink",
  },
];
