export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  shape: "wide" | "tall" | "full" | "half";
};

export type Project = {
  slug: string;
  title: string;
  short: string;
  year: string;
  role: string;
  category: string;
  applicationCategory: string;
  hook: string;
  seoTitle: string;
  description: string;
  overview: string[];
  stack: string[];
  links: { label: string; href: string }[];
  cover: string;
  coverAlt: string;
  socialImage: string;
  stats: { value: string; label: string }[];
  contributionTitle: string;
  contribution: string[];
  challenges?: string[];
  gallery: GalleryItem[];
};

export const PROJECTS: Project[] = [
  {
    slug: "papers-codechef-vit",
    title: "Papers by CodeChef-VIT",
    short: "Papers",
    year: "2025",
    role: "Full-stack developer · CodeChef-VIT",
    category: "Education platform",
    applicationCategory: "EducationalApplication",
    hook: "Two million visits and counting.",
    seoTitle: "Papers by CodeChef-VIT: Past Exam Papers for VIT Students",
    description:
      "Papers by CodeChef-VIT is the go-to platform for VIT past exam papers, with 2M+ visits and 2,000+ papers. Built with Next.js, MongoDB and the Gemini API.",
    overview: [
      "Papers is where VIT Vellore students find previous years' question papers for every course in the college. It holds more than 2,000 papers, is actively used by 40,000 to 50,000 students, and sees up to 10,000 people every exam season. It has crossed two million visits.",
      "On the surface it's a simple website: search for a course, filter by exam, slot and year, and open the paper. Underneath, it's two applications. The public Papers site is what students see, and a separate admin portal is where uploads are reviewed, tagged and published. A Gemini-powered pipeline reads each uploaded paper and extracts its course code, exam type, slot and year automatically, so the library keeps growing without anyone filling in metadata by hand.",
      "Uploaded papers were originally stored on Cloudinary and have since moved to Google Cloud Storage.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Gemini API",
      "Google Cloud Storage",
      "Tailwind CSS",
    ],
    links: [
      { label: "Live site", href: "https://www.papers.codechefvit.com/" },
      {
        label: "Repository",
        href: "https://github.com/CodeChefVIT/papers-codechef",
      },
    ],
    cover: "/projects/papers/papers-codechef-vit-subject-page.webp",
    coverAlt:
      "Papers by CodeChef-VIT subject page listing VLSI System Design exam papers with filters for exam, slot and year",
    socialImage: "/projects/papers/papers-codechef-vit-social-card.webp",
    stats: [
      { value: "2M+", label: "Total visits" },
      { value: "40K+", label: "Active students at VIT" },
      { value: "10K", label: "Users every exam season" },
    ],
    contributionTitle: "My contribution",
    contribution: [
      "Restructured the Gemini-powered extraction backend that reads uploaded papers and pulls out the course code, exam, slot and year, making it much more efficient and reliable.",
      "Worked heavily on the admin portal, the internal tool where papers are reviewed, corrected and published before students ever see them.",
      "Helped keep the platform fast and stable through exam weeks, when traffic spikes and every bug lands in front of thousands of students at once.",
    ],
    challenges: [
      "It was the biggest codebase I had worked on at that point. Next.js and several other parts of the stack were new to me when I joined, so I was learning them while shipping real features. I'm comfortable with them now, but back then it was a huge undertaking.",
      "The deadlines were real. Papers matters most during exams, so bugs show up exactly when students need it. More than once, I was fixing issues in the middle of exam week, with thousands of people refreshing the site waiting for a paper to load.",
      "That pressure taught me to read unfamiliar code quickly, make small, safe changes, and ship fixes without breaking anything else for the people depending on it.",
    ],
    gallery: [
      {
        src: "/projects/papers/papers-codechef-vit-subject-page.webp",
        alt: "Papers subject page with exam, slot, year and semester filters next to a grid of past papers",
        caption: "Subject page with filters for exam, slot, year and semester",
        shape: "wide",
      },
      {
        src: "/projects/papers/papers-codechef-vit-mobile.webp",
        alt: "Papers mobile view showing the Spanish I subject page and the navigation menu",
        caption: "Mobile view",
        shape: "tall",
      },
      {
        src: "/projects/papers/papers-codechef-vit-paper-viewer.webp",
        alt: "Papers viewer displaying a VLSI System Design CAT-1 question paper with zoom, download and share controls",
        caption: "Paper viewer with zoom, download and share",
        shape: "wide",
      },
    ],
  },
  {
    slug: "mikon",
    title: "Mikon",
    short: "Mikon",
    year: "2026",
    role: "Solo project · Design and development",
    category: "Training app",
    applicationCategory: "HealthApplication",
    hook: "Every good part of every training app, none of the bad.",
    seoTitle: "Mikon: Training Program Builder and Workout Logger",
    description:
      "Mikon is a training app for building workout programs, logging sessions and tracking muscle fatigue. It imports your history from Strong, Hevy and other apps.",
    overview: [
      "Mikon is a training app for building custom programs and logging workouts. I've used apps like Strong and Hevy for a long time, and every one of them did some things really well and other things badly. Mikon brings together the best parts of all of them and leaves out the frustrating ones.",
      "You can plan programs across weightlifting, calisthenics, plyometrics, cardio and sport on a drag-and-drop board, explore a library of 900+ exercises on an interactive muscle map, and see fatigue and weekly volume for every muscle as you plan. When it's time to train, a phone-first workout logger handles sets, reps, previous numbers and rest timers.",
      "Switching is painless too. Mikon imports your full workout history from Strong, Hevy, Lyfta and MacroFactor, so you don't lose years of progress by trying something new.",
    ],
    stack: ["Next.js", "TypeScript", "MongoDB", "UploadThing", "Web Push"],
    links: [
      { label: "Live app", href: "https://mikon.advikgupta.dev" },
      { label: "Repository", href: "https://github.com/Advik-Gupta/mikon" },
    ],
    cover: "/projects/mikon/mikon-training-app-dashboard.webp",
    coverAlt:
      "Mikon home dashboard with the upcoming program, training focus, body snapshot and weekly schedule",
    socialImage: "/projects/mikon/mikon-training-app-social-card.webp",
    stats: [
      { value: "900+", label: "Exercises in the library" },
      { value: "4", label: "Apps you can import from" },
      { value: "5", label: "Training disciplines" },
    ],
    contributionTitle: "What I built",
    contribution: [
      "A program builder with a drag-and-drop board of days and activity blocks, plus dedicated editors for lifting, calisthenics, plyometrics, cardio and sport.",
      "Fatigue and volume tracking that converts every activity into sets per muscle, with day-by-day recovery and weekly volume targets.",
      "An interactive muscle and exercise explorer with male and female body maps and a library of 900+ exercises.",
      "A phone-first workout logger with previous numbers, warm-ups, swaps, notes and rest timers that keep running when you leave the app.",
      "Importers for Strong, Hevy, Lyfta and MacroFactor that match exercises to the library automatically, plus exports back to all four formats.",
    ],
    gallery: [
      {
        src: "/projects/mikon/mikon-training-app-dashboard.webp",
        alt: "Mikon dashboard showing the next program, training focus, body snapshot and weekly sessions",
        caption: "Home dashboard",
        shape: "wide",
      },
      {
        src: "/projects/mikon/mikon-workout-logger-mobile.webp",
        alt: "Mikon mobile workout logger tracking sets of V-bar pulldowns with previous weights and best estimated one-rep max",
        caption: "Workout logger on mobile",
        shape: "tall",
      },
      {
        src: "/projects/mikon/mikon-muscle-explorer.webp",
        alt: "Mikon muscle explorer with front and back body maps highlighting the abs and obliques next to matching exercises",
        caption: "Muscle and exercise explorer",
        shape: "wide",
      },
    ],
  },
  {
    slug: "blast-radius",
    title: "Blast Radius",
    short: "Blast Radius",
    year: "2026",
    role: "Hackathon team · 3rd place",
    category: "Developer tool",
    applicationCategory: "DeveloperApplication",
    hook: "Explore any big repository in minutes. Third place at the hackathon.",
    seoTitle: "Blast Radius: Codebase Map for Exploring Large Repositories",
    description:
      "Blast Radius maps every function in a codebase so new developers can explore large repositories fast. Built at a hackathon, where it won third place.",
    overview: [
      "Blast Radius helps new developers understand big repositories quickly. It maps out an entire codebase, every function and every call between them, and shows how far a change to any function would reach.",
      "We built it at a hackathon, where it won third place. Beyond the call graph, it packs a whole suite of tools into one place: a DevOps view that maps your services, ports and volumes, a database schema explorer, Git history and backups, a function index and an AI context export.",
      "The idea is simple, but the execution is what made it stand out, especially the retro, game-inspired interface, which makes exploring a huge codebase feel more like playing than reading.",
    ],
    stack: ["TypeScript", "tree-sitter", "D3", "VS Code API"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Advik-Gupta/blast-radius",
      },
    ],
    cover: "/projects/blast-radius/blast-radius-function-call-graph.webp",
    coverAlt:
      "Blast Radius function call graph mapping 586 functions with a selected function's callers and risk details",
    socialImage: "/projects/blast-radius/blast-radius-social-card.webp",
    stats: [
      { value: "3rd", label: "Place at the hackathon" },
      { value: "586", label: "Functions mapped in the demo repo" },
      { value: "9", label: "Tools in one interface" },
    ],
    contributionTitle: "What we built",
    contribution: [
      "A function call graph that maps every function in a repository and highlights how far a change to any one of them reaches.",
      "A DevOps view that turns your Docker setup into a diagram of services, ports, volumes and dependencies, with automatic checks for common mistakes.",
      "A database schema explorer that detects tables and relationships from migrations and lays them out automatically.",
      "Git history and backups, a searchable function index and an AI context export, all in the same interface.",
    ],
    challenges: [
      "The obvious one was time. We had a single hackathon to go from an idea to a working tool, and we kept adding features: the call graph, the DevOps view, the schema explorer, Git backups and more.",
      "Shipping that much in so little time meant ruthless prioritisation. Each feature had to be simple enough to finish, and the interface had to make all of it feel like one product rather than a pile of tabs.",
    ],
    gallery: [
      {
        src: "/projects/blast-radius/blast-radius-function-call-graph.webp",
        alt: "Blast Radius function call graph with a function index and risk details for the selected function",
        caption: "Function call graph and index",
        shape: "full",
      },
      {
        src: "/projects/blast-radius/blast-radius-devops-view.webp",
        alt: "Blast Radius DevOps view showing web, API, Postgres and Redis services with configuration checks",
        caption: "DevOps view with service checks",
        shape: "half",
      },
      {
        src: "/projects/blast-radius/blast-radius-database-schema.webp",
        alt: "Blast Radius database schema explorer with tables and relationships arranged automatically",
        caption: "Database schema explorer",
        shape: "half",
      },
    ],
  },
];
