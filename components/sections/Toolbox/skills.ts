export type Tone = "ink" | "orange" | "outline" | "soft";

export const SKILLS: { name: string; tone: Tone; group: string }[] = [
  { name: "Go", tone: "orange", group: "Languages" },
  { name: "TypeScript", tone: "ink", group: "Languages" },
  { name: "Python", tone: "outline", group: "Languages" },
  { name: "Java", tone: "soft", group: "Languages" },
  { name: "SQL", tone: "outline", group: "Languages" },
  { name: "Next.js", tone: "ink", group: "Frameworks" },
  { name: "React", tone: "orange", group: "Frameworks" },
  { name: "Node.js", tone: "soft", group: "Frameworks" },
  { name: "Express", tone: "outline", group: "Frameworks" },
  { name: "TanStack Query", tone: "soft", group: "Frameworks" },
  { name: "Zustand", tone: "outline", group: "Frameworks" },
  { name: "PostgreSQL", tone: "ink", group: "Data & Cloud" },
  { name: "MongoDB", tone: "soft", group: "Data & Cloud" },
  { name: "Redis", tone: "orange", group: "Data & Cloud" },
  { name: "Docker", tone: "ink", group: "Data & Cloud" },
  { name: "AWS", tone: "outline", group: "Data & Cloud" },
  { name: "Google Cloud", tone: "soft", group: "Data & Cloud" },
  { name: "CI/CD", tone: "outline", group: "Data & Cloud" },
  { name: "RBAC", tone: "orange", group: "Security" },
  { name: "JWT & OAuth2", tone: "ink", group: "Security" },
  { name: "Burp Suite", tone: "soft", group: "Security" },
  { name: "Wireshark", tone: "outline", group: "Security" },
  { name: "Nmap", tone: "soft", group: "Security" },
  { name: "RAG", tone: "orange", group: "AI" },
  { name: "LLM APIs", tone: "ink", group: "AI" },
  { name: "Vector search", tone: "outline", group: "AI" },
];

export const GROUPS = Array.from(new Set(SKILLS.map((s) => s.group)));

export const GROUP_INFO: Record<string, { title: string; blurb: string }> = {
  Languages: {
    title: "What I think in",
    blurb:
      "Go for fast, boring-in-a-good-way backends. TypeScript for anything with a UI.",
  },
  Frameworks: {
    title: "What I build with",
    blurb:
      "Next.js and React up front, Node and Express behind, TanStack Query in between.",
  },
  "Data & Cloud": {
    title: "Where it lives",
    blurb:
      "Postgres when it matters, Redis when it needs to be fast, Docker so it runs anywhere.",
  },
  Security: {
    title: "How it stays safe",
    blurb:
      "Roles, sessions and audit trails by default. And poking at my own stuff before anyone else does.",
  },
  AI: {
    title: "The new stuff",
    blurb:
      "LLMs wired into real products: retrieval, embeddings and automating the boring parts.",
  },
};
