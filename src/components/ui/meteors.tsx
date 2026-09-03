"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = Array.from({ length: number }, (_, idx) => ({
    top: "-40px",
    left: `${((idx * 73) % 900) - 150}px`,
    animationDelay: `${((idx * 0.23) % 2).toFixed(2)}s`,
    animationDuration: `${(idx % 5) + 3}s`,
  }));

  return (
    <>
      {meteors.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg] pointer-events-none",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={style}
        />
      ))}
    </>
  );
};
