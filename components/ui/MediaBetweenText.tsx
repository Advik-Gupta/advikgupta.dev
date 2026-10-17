"use client";

import {
  ElementType,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { motion, useInView, UseInViewOptions, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface MediaBetweenTextProps {
  firstText: string;
  secondText: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  mediaContainerClassName?: string;
  fallbackUrl?: string;
  as?: ElementType;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  alt?: string;
  triggerType?: "hover" | "ref" | "inView";
  containerRef?: React.RefObject<HTMLDivElement | null>;
  useInViewOptionsProp?: UseInViewOptions;
  animationVariants?: {
    initial: Variants["initial"];
    animate: Variants["animate"];
  };
  className?: string;
  leftTextClassName?: string;
  rightTextClassName?: string;
}

export type MediaBetweenTextRef = {
  animate: () => void;
  reset: () => void;
};

export const MediaBetweenText = forwardRef<
  MediaBetweenTextRef,
  MediaBetweenTextProps
>(
  (
    {
      firstText,
      secondText,
      mediaUrl,
      mediaType,
      mediaContainerClassName,
      fallbackUrl,
      as = "p",
      autoPlay = true,
      loop = true,
      muted = true,
      playsInline = true,
      alt,
      triggerType = "hover",
      containerRef,
      useInViewOptionsProp = { once: true, amount: 0.5 },
      animationVariants = {
        initial: { width: 0, opacity: 1 },
        animate: {
          width: "auto",
          opacity: 1,
          transition: { duration: 0.6, type: "spring", bounce: 0 },
        },
      },
      className,
      leftTextClassName,
      rightTextClassName,
    },
    ref,
  ) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isInView = useInView(
      containerRef ?? componentRef,
      useInViewOptionsProp,
    );

    useImperativeHandle(ref, () => ({
      animate: () => setIsAnimating(true),
      reset: () => setIsAnimating(false),
    }));

    const shouldAnimate =
      triggerType === "hover"
        ? isHovered
        : triggerType === "inView"
          ? isInView
          : triggerType === "ref"
            ? isAnimating
            : false;

    const TextComponent = useMemo(() => motion.create(as as "p"), [as]);

    return (
      <div
        className={cn("flex items-center", className)}
        ref={componentRef}
        onMouseEnter={() => triggerType === "hover" && setIsHovered(true)}
        onMouseLeave={() => triggerType === "hover" && setIsHovered(false)}
      >
        <TextComponent className={leftTextClassName}>{firstText}</TextComponent>
        <span className="media-anchor">
          <motion.div
            className={cn(mediaContainerClassName)}
            variants={animationVariants}
            initial="initial"
            animate={shouldAnimate ? "animate" : "initial"}
          >
            {mediaType === "video" ? (
              <video
                className="w-full h-full object-cover"
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                playsInline={playsInline}
                poster={fallbackUrl}
              >
                <source src={mediaUrl} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={mediaUrl}
                alt={alt ?? `${firstText} ${secondText}`}
                fill
                sizes="200px"
                className="object-cover"
              />
            )}
          </motion.div>
        </span>
        <TextComponent className={rightTextClassName}>
          {secondText}
        </TextComponent>
      </div>
    );
  },
);

MediaBetweenText.displayName = "MediaBetweenText";
export default MediaBetweenText;
