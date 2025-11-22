'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function TypingText({
  text,
  className = '',
  delay = 0,
  speed = 0.05
}: TypingTextProps) {
  const [isInView, setIsInView] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: delay
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
    },
  };

  return (
    <motion.h2
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      onViewportEnter={() => setIsInView(true)}
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={child}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-0.5 h-[0.9em] bg-[#5D8A3A] ml-1"
        animate={{ opacity: isInView ? [0, 1, 0] : 0 }}
        transition={{
          duration: 0.8,
          repeat: 3,
          ease: "linear",
        }}
      />
    </motion.h2>
  );
}
