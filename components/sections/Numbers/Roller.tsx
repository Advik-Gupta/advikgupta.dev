const CELLS = Array.from({ length: 20 }, (_, i) => i % 10);

export default function Roller({ digit }: { digit: number }) {
  return (
    <span className="roll" data-d={digit}>
      <span className="roll__ghost">{digit}</span>
      <span className="roll__strip">
        {CELLS.map((n, i) => (
          <span key={i}>{n}</span>
        ))}
      </span>
    </span>
  );
}
