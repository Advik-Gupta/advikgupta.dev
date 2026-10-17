export default function ConstructionZone({
  x,
  y,
  road,
}: {
  x: number;
  y: number;
  road: number;
}) {
  const u = Math.max(road * 1.25, 26);
  const cone = u * 0.62;
  const sign = u * 0.8;
  const sx = x - road / 2 - u * 0.35 - u * 0.75;
  return (
    <g className="journey__works">
      <rect
        x={x - road / 2 - u * 0.35}
        y={y - u * 0.2}
        width={road / 2 + u * 0.35}
        height={u * 0.4}
        rx="3"
        fill="url(#hazard)"
        stroke="#111"
        strokeWidth="1.5"
      />
      {[-1, 1].map((s) => (
        <g
          key={s}
          transform={`translate(${x - road / 4 - u * 0.12} ${y + s * u * 1.15})`}
        >
          <polygon
            points={`0,${-cone * 0.55} ${cone * 0.32},${cone * 0.4} ${-cone * 0.32},${cone * 0.4}`}
            fill="#ff7a2c"
            stroke="#111"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <rect
            x={-cone * 0.2}
            y={-cone * 0.08}
            width={cone * 0.4}
            height={cone * 0.14}
            fill="#fbf8f2"
          />
          <rect
            x={-cone * 0.42}
            y={cone * 0.36}
            width={cone * 0.84}
            height={cone * 0.12}
            rx="1"
            fill="#111"
          />
        </g>
      ))}
      <line
        x1={sx}
        y1={y}
        x2={sx}
        y2={y + sign * 1.1}
        stroke="#111"
        strokeWidth="2"
      />
      <rect
        x={sx - sign / 2}
        y={y - sign / 2}
        width={sign}
        height={sign}
        rx="2"
        transform={`rotate(45 ${sx} ${y})`}
        fill="#ff7a2c"
        stroke="#111"
        strokeWidth="1.5"
      />
      <text
        x={sx}
        y={y + sign * 0.2}
        textAnchor="middle"
        fontSize={sign * 0.6}
        fontWeight="900"
        fill="#111"
        fontFamily="var(--font-bebas), sans-serif"
      >
        !
      </text>
    </g>
  );
}
