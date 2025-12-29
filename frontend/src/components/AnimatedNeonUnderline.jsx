import React from "react";
import { motion } from "framer-motion";

export default function AnimatedNeonUnderline({ className = "" }) {
  return (
    <motion.span
      aria-hidden="true"
      className={
        "mt-3 block h-[2px] w-40 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_0_18px_rgba(52,211,153,0.35)] " +
        className
      }
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "10rem", opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
    />
  );
}
