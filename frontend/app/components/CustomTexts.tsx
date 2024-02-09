'use client';

import { motion } from 'framer-motion';
import { staggerContainer, textContainer, textVariant2 } from '@/utils/motion';

type TypingTextProps = {
  title: string;
  textStyles: React.CSSProperties | string;
  
};

type TitleTextProps = {
  textStyles: React.CSSProperties | string;
  children: React.ReactNode
}

export const TypingText = ({ title, textStyles }: TypingTextProps) => (
  <motion.div
    variants={staggerContainer(0.1, 0.1)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.25 }}
  >
    <motion.p variants={textContainer} className={`${textStyles}`}>
      {Array.from(title).map((letter, index) => (
        <motion.span variants={textVariant2} key={index}>
          {letter === ' ' ? '\u00a0' : letter}
        </motion.span>
      ))}
    </motion.p>
  </motion.div>
);

export const TitleText = ({ children, textStyles }: TitleTextProps) => (
  <motion.div
    variants={staggerContainer(0.1, 0.1)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.25 }}
  >
    <motion.h2
      variants={textVariant2}
      initial="hidden"
      whileInView="show"
      className={` ${textStyles}`}
    >
      {children}
    </motion.h2>
  </motion.div>
);
