export type Point = { x: number; y: number };

function curve(a: Point, b: Point) {
  const k = (b.y - a.y) * 0.55;
  return `C ${a.x} ${a.y + k}, ${b.x} ${b.y - k}, ${b.x} ${b.y}`;
}

export function buildPath(points: Point[]) {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++)
    d += ` ${curve(points[i - 1], points[i])}`;
  return d;
}

export function buildSegments(points: Point[]) {
  const segments: string[] = [];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    segments.push(`M ${a.x} ${a.y} ${curve(a, points[i])}`);
  }
  return segments;
}
