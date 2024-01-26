'use client';

import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
};

const Template = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'linear', delay: 1 }}
    >
      {children}
    </motion.div>
  );
};
export default Template;
