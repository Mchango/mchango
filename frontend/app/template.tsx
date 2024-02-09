'use client';

import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
};

/**
 * @dev this function enables animation on page navigation
 */

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Template = ({ children }: Props) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      transition={{
        delay: 0.45,
        ease: 'easeInOut',
        duration: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
};
export default Template;
