"use client";

import WaveGallery from "./WaveGallery";

const PHOTOS = [
  { src: "/assets/image6.jpeg", alt: "A dog" },
  { src: "/assets/image5.JPG", alt: "Chicken and waffles" },
  { src: "/assets/image7.JPG", alt: "A storefront" },
  { src: "/assets/image4.JPG", alt: "A disco chandelier" },
  { src: "/assets/image9.jpeg", alt: "Breakfast" },
  { src: "/assets/image22.JPG", alt: "Bangalore skyline" },
  { src: "/assets/image3.JPG", alt: "Banoffee pie" },
  { src: "/assets/image18.JPG", alt: "Garlic bread" },
];

export default function Example() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        paddingTop: "4%",
        overflow: "hidden",
        background: "#ede8df",
      }}
    >
      <div style={{ width: "100%", height: "62%" }}>
        <WaveGallery photos={PHOTOS} />
      </div>
    </div>
  );
}
