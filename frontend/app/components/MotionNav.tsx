'use client';

import React from 'react';
import { motion } from 'framer-motion';

type MotionNavProps = {
  children: React.ReactNode;
  className?: string; // Optional className prop
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const MotionNav = ({ children, className }: MotionNavProps) => {
  return (
    <motion.nav
      className={className} // Apply the className prop here
      variants={variants}
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      transition={{
        delay: 0.1,
        ease: 'easeInOut',
        duration: 0.5,
      }}
    >
      {children}
    </motion.nav>
  );
};

export default MotionNav;
