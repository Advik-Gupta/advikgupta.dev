import Image from "next/image";
import MarqueeAlongSvgPath from "@/components/freebies/WaveGallery/MarqueeAlongSvgPath";
import MediaBetweenText from "@/components/ui/MediaBetweenText";
import { PHOTOS } from "./photos";
import "./Gallery.css";

const WAVE_PATH =
  "M-200 340 C0 340 140 210 300 175 C420 148 530 200 625 228 C720 256 775 268 855 228 C940 185 1020 120 1130 135 C1240 150 1370 220 1650 208 C1800 202 1900 212 2000 208";

const HOVER_VARIANTS = {
  initial: { width: 0 },
  animate: {
    width: "200px",
    transition: { duration: 0.4, type: "spring" as const, bounce: 0 },
  },
};

export default function Gallery() {
  return (
    <section className="gallery">
      <div className="gallery__top">
        <div className="section-text section-text--desktop">
          <MediaBetweenText
            firstText="I ("
            secondText=") don't just build websites."
            mediaUrl="/assets/advik.jpeg"
            mediaType="image"
            alt="Advik"
            triggerType="hover"
            animationVariants={HOVER_VARIANTS}
            className="section-text__line section-text__line--left"
            leftTextClassName="section-text__word"
            rightTextClassName="section-text__word"
            mediaContainerClassName="section-text__media"
          />
          <MediaBetweenText
            firstText="I craft digital ("
            secondText=") experiences"
            mediaUrl="/assets/brands.JPG"
            mediaType="image"
            alt="telephone"
            triggerType="hover"
            animationVariants={HOVER_VARIANTS}
            className="section-text__line section-text__line--right"
            leftTextClassName="section-text__word"
            rightTextClassName="section-text__word"
            mediaContainerClassName="section-text__media"
          />
        </div>

        <div className="section-text section-text--mobile">
          <div className="section-text__main">
            <p className="section-text__plain">
              I don&apos;t just build websites.
            </p>
            <p className="section-text__plain">I craft digital experiences.</p>
          </div>
          <p className="section-text__sub">
            Every pixel is a decision.&nbsp; Every decision is about conversion.
          </p>
        </div>
      </div>

      <div className="gallery__bottom">
        <MarqueeAlongSvgPath
          path={WAVE_PATH}
          viewBox="-150 0 1740 400"
          baseVelocity={7}
          slowdownOnHover={true}
          repeat={1}
          responsive
          className="gallery__marquee"
        >
          {PHOTOS.map(({ src, alt }, i) => (
            <div key={i} className="marquee-photo">
              <Image
                src={src}
                alt={alt}
                width={130}
                height={130}
                className="marquee-photo__img"
              />
            </div>
          ))}
        </MarqueeAlongSvgPath>
      </div>
    </section>
  );
}
