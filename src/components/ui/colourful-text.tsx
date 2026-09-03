"use client";

import React from "react";
import { motion } from "motion/react";

export default function ColourfulText({ text }: { text: string }) {
  const colors = [
    "rgb(131, 179, 32)", // Green
    "rgb(47, 195, 106)", // Emerald
    "rgb(42, 169, 210)", // Cyan
    "rgb(4, 112, 202)", // Blue
    "rgb(107, 10, 255)", // Indigo
    "rgb(183, 0, 218)", // Purple
    "rgb(218, 0, 171)", // Pink
    "rgb(230, 64, 92)", // Rose
    "rgb(232, 98, 63)", // Orange
    "rgb(249, 129, 47)", // Light Orange
  ];

  const characters = text.split("");

  return (
    <span className="inline-block relative">
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          animate={{
            color: colors,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
            times: colors.map((_, i) => i / (colors.length - 1)),
            delay: index * 0.05,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
