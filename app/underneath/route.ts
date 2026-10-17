import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-static";

const MODULES = [
  {
    name: "Hero",
    selector: "#home",
    files: ["sections/Hero/Hero.tsx", "sections/Hero/Hero.css"],
  },
  {
    name: "Gallery",
    selector: ".gallery",
    files: [
      "sections/Gallery/Gallery.tsx",
      "sections/Gallery/photos.ts",
      "freebies/WaveGallery/MarqueeAlongSvgPath.tsx",
    ],
  },
  {
    name: "Story",
    selector: "#story",
    files: [
      "sections/Story/Story.tsx",
      "sections/Story/Story.css",
      "ui/ResumeButton/ResumeButton.tsx",
    ],
  },
  {
    name: "Numbers",
    selector: ".numbers",
    files: [
      "sections/Numbers/Numbers.tsx",
      "sections/Numbers/stats.ts",
      "sections/Numbers/Roller.tsx",
      "sections/Numbers/TileIcon.tsx",
    ],
  },
  {
    name: "Works",
    selector: "#work",
    files: [
      "sections/Works/Works.tsx",
      "sections/Works/projects.ts",
      "sections/Works/Works.css",
    ],
  },
  {
    name: "Journey",
    selector: "#journey",
    files: [
      "sections/Journey/Journey.tsx",
      "sections/Journey/stops.ts",
      "sections/Journey/Vehicles.tsx",
      "sections/Journey/ConstructionZone.tsx",
      "sections/Journey/path.ts",
    ],
  },
  {
    name: "Toolbox",
    selector: "#toolbox",
    files: ["sections/Toolbox/Toolbox.tsx", "sections/Toolbox/skills.ts"],
  },
  {
    name: "Contact",
    selector: "#contact",
    files: [
      "sections/Contact/Contact.tsx",
      "sections/Contact/VelloreTime.tsx",
      "sections/Contact/Contact.css",
    ],
  },
];

export function GET() {
  const root = join(process.cwd(), "components");
  const modules = MODULES.map((m) => ({
    ...m,
    files: m.files.map((file) => ({
      path: `components/${file}`,
      code: readFileSync(join(root, file), "utf8"),
    })),
  }));
  return Response.json({ modules });
}
