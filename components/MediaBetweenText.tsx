"use client";

import {
  ElementType,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
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
    ref
  ) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isInView = useInView(
      containerRef ?? componentRef,
      useInViewOptionsProp
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const TextComponent = motion.create(as as any);

    return (
      <div
        className={cn("flex items-center", className)}
        ref={componentRef}
        onMouseEnter={() => triggerType === "hover" && setIsHovered(true)}
        onMouseLeave={() => triggerType === "hover" && setIsHovered(false)}
      >
        <TextComponent className={leftTextClassName}>
          {firstText}
        </TextComponent>
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
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mediaUrl}
              alt={alt ?? `${firstText} ${secondText}`}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
        <TextComponent className={rightTextClassName}>
          {secondText}
        </TextComponent>
      </div>
    );
  }
);

MediaBetweenText.displayName = "MediaBetweenText";
export default MediaBetweenText;
