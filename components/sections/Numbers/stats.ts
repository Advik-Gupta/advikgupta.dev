export type Stat = {
  value: string;
  prefix?: string;
  suffix?: string;
  caption: string;
  tone: "ink" | "orange" | "soft" | "cream";
  icon: "badge" | "blocks" | "coin" | "clock";
};

export const STATS: Stat[] = [
  {
    value: "3",
    suffix: "M+",
    caption: "total visits across all my projects",
    tone: "ink",
    icon: "badge",
  },
  {
    value: "10",
    caption: "client projects shipped",
    tone: "orange",
    icon: "blocks",
  },
  {
    value: "12",
    prefix: "$",
    suffix: "K+",
    caption: "saved for clients",
    tone: "soft",
    icon: "coin",
  },
  {
    value: "850",
    caption: "hours saved for clients",
    tone: "cream",
    icon: "clock",
  },
];
