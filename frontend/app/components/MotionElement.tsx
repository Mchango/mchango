'use client';

import React from 'react';
import { motion } from 'framer-motion';

type MotionElementProps = {
  children: React.ReactNode;
  className?: string; // Optional className prop
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const MotionElement = ({ children, className }: MotionElementProps) => {
  return (
    <motion.p
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
    </motion.p>
  );
};

export default MotionElement;
