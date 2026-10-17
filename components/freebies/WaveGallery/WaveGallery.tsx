"use client";

import MarqueeAlongSvgPath from "./MarqueeAlongSvgPath";
import "./WaveGallery.css";

type Photo = { src: string; alt: string };

type Props = {
  photos: Photo[];
  speed?: number;
  path?: string;
  viewBox?: string;
};

const WAVE =
  "M-200 340 C0 340 140 210 300 175 C420 148 530 200 625 228 C720 256 775 268 855 228 C940 185 1020 120 1130 135 C1240 150 1370 220 1650 208 C1800 202 1900 212 2000 208";

export default function WaveGallery({
  photos,
  speed = 7,
  path = WAVE,
  viewBox = "-150 0 1740 400",
}: Props) {
  return (
    <div className="wg">
      <MarqueeAlongSvgPath
        path={path}
        viewBox={viewBox}
        baseVelocity={speed}
        slowdownOnHover
        repeat={1}
        responsive
        className="wg__marquee"
      >
        {photos.map(({ src, alt }, i) => (
          <div key={i} className="wg__photo">
            <img src={src} alt={alt} loading="lazy" draggable={false} />
          </div>
        ))}
      </MarqueeAlongSvgPath>
    </div>
  );
}
