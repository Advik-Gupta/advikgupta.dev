import Image from "next/image";
import MarqueeAlongSvgPath from "./MarqueeAlongSvgPath";
import MediaBetweenText from "./MediaBetweenText";
import "./SecondSection.css";

const images = [
  { src: "/assets/image1.jpeg", alt: "Image of Advik Gupta" },
  { src: "/assets/image2.jpeg", alt: "Image of a flower" },
  { src: "/assets/image3.JPG", alt: "Image of a banoffee pie" },
  { src: "/assets/image4.JPG", alt: "Image of a disco chandelier" },
  { src: "/assets/image5.JPG", alt: "Image of friend chicken and waflles" },
  { src: "/assets/image6.jpeg", alt: "Image of a dog" },
  { src: "/assets/image7.JPG", alt: "Image of a storeboard" },
  {
    src: "/assets/image8.jpeg",
    alt: "Image of Advik Gupta in front of mirror",
  },
  { src: "/assets/image9.jpeg", alt: "Image of breakfast meal" },
  { src: "/assets/image22.JPG", alt: "Image of bangalore skyline" },
  { src: "/assets/image18.JPG", alt: "Image of gralic bread" },
  { src: "/assets/image10.JPG", alt: "Image of VIT Vellore" },
];

const WAVE_PATH =
  "M-200 340 C0 340 140 210 300 175 C420 148 530 200 625 228 C720 256 775 268 855 228 C940 185 1020 120 1130 135 C1240 150 1370 220 1650 208 C1800 202 1900 212 2000 208";

const HOVER_VARIANTS = {
  initial: { width: 0 },
  animate: {
    width: "200px",
    transition: { duration: 0.4, type: "spring" as const, bounce: 0 },
  },
};

export default function SecondSection() {
  return (
    <section className="second-section">
      <div className="second-section__top">
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
            firstText="I build the thing that makes brands ("
            secondText=") sell"
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
            <p className="section-text__plain">
              I build the thing that makes brands sell.
            </p>
          </div>
          <p className="section-text__sub">
            Every pixel is a decision.&nbsp; Every decision is about conversion.
          </p>
        </div>
      </div>

      <div className="second-section__bottom">
        <MarqueeAlongSvgPath
          path={WAVE_PATH}
          viewBox="-150 0 1740 400"
          baseVelocity={7}
          slowdownOnHover={true}
          repeat={1}
          responsive
          className="second-section__marquee"
        >
          {images.map(({ src, alt }, i) => (
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
