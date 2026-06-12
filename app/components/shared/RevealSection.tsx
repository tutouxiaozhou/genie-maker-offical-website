'use client';

import React from 'react';
import { motion } from 'motion/react';

export const revealEase: readonly [number, number, number, number] = [0.16, 1, 0.3, 1];

export const sectionReveal = {
  hidden: { opacity: 0, y: 42, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.82,
      ease: revealEase,
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

export const itemReveal = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      ease: revealEase,
    },
  },
};

export const revealViewport = { once: true, amount: 0.22, margin: "0px 0px -12% 0px" };

export function RevealSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemReveal} className={className}>
      {children}
    </motion.div>
  );
}