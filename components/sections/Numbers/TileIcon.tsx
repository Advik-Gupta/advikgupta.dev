import type { Stat } from "./stats";

export default function TileIcon({ kind }: { kind: Stat["icon"] }) {
  if (kind === "badge") {
    return (
      <svg className="tile__badge" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <path
            id="badge-ring"
            d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0"
          />
        </defs>
        <circle cx="50" cy="50" r="48" className="tile__badge-bg" />
        <g className="tile__badge-spin">
          <text className="tile__badge-text">
            <textPath href="#badge-ring">
              and counting • and counting • and counting •
            </textPath>
          </text>
        </g>
        <path d="M42 58 L58 42 M47 42 H58 V53" className="tile__badge-arrow" />
      </svg>
    );
  }
  if (kind === "blocks") {
    return (
      <span className="tile__blocks" aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} style={{ transitionDelay: `${0.5 + i * 0.09}s` }} />
        ))}
      </span>
    );
  }
  if (kind === "coin") {
    return (
      <span className="tile__coin" aria-hidden="true">
        <span>$</span>
      </span>
    );
  }
  return (
    <svg className="tile__clock" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="28" />
      {Array.from({ length: 12 }, (_, i) => (
        <line
          key={i}
          x1="32"
          y1="8"
          x2="32"
          y2={i % 3 === 0 ? 14 : 11}
          transform={`rotate(${i * 30} 32 32)`}
        />
      ))}
      <line className="tile__clock-hour" x1="32" y1="32" x2="32" y2="20" />
      <line className="tile__clock-min" x1="32" y1="32" x2="32" y2="12" />
      <circle cx="32" cy="32" r="2.5" className="tile__clock-pin" />
    </svg>
  );
}
