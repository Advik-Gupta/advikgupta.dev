// components/about/AboutSection.jsx
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

import "./aboutSection.styles.css";

const skills = [
  { name: "React", color: "#61dafb" },
  { name: "Node.js", color: "#68a063" },
  { name: "MongoDB", color: "#4db33d" },
  { name: "Express.js", color: "#000000" },
  { name: "Next.js", color: "#ffffff", textColor: "#000000" },
  { name: "Python", color: "#306998" },
  { name: "JavaScript", color: "#f7df1e", textColor: "#000000" },
  { name: "Git", color: "#f1502f" },
  { name: "Redux", color: "#764abc" },
  { name: "Figma", color: "#f24e1e" },
  { name: "TailwindCSS", color: "#38bdf8" },
  { name: "Firebase", color: "#ffca28", textColor: "#000000" },
];

export default function AboutSection() {
  const skillRefs = useRef([]);

  useEffect(() => {
    skillRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        { opacity: 0, y: 20, rotate: -2 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          delay: index * 0.1,
          duration: 0.5,
          ease: "power3.out",
        }
      );

      gsap.to(ref, {
        rotate: 2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    });
  }, []);

  return (
    <section
      id="about"
      className="about-section w-full py-20 px-8 sm:px-20 text-white"
    >
      <div className="about-container">
        <div className="flex flex-col items-start gap-4 max-w-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">👨‍💻 About Me</h2>
          <p className="text-lg leading-relaxed">
            Hi, I’m Advik Gupta, a self-taught programmer from India. I am
            currently focused on full-stack web development, with a passion for
            machine learning and AI. I love learning new technologies and
            programming languages and increasing the extent of my skillset. I am
            a diligent worker with a penchant for delivering quality work which
            is visible in everything I do. I would love to collaborate on
            projects from which I can learn something new and gain more
            experience. I'm always looking to learning new things and making
            friends along the way. I started gaining knowledge from a young age,
            which makes me even more open to channelising my thoughts and ideas,
            into more structured forms.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <Image
            src="/advik.jpeg"
            alt="Advik Gupta"
            width={260}
            height={260}
            className="rounded-[2rem] shadow-2xl object-cover"
          />

          <div className="skills-grid mt-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                ref={(el) => (skillRefs.current[index] = el)}
                className="skill-pill"
                style={{
                  backgroundColor: skill.color,
                  color: skill.textColor || "#fff",
                }}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
