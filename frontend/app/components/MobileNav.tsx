'use client';

import { useActiveContext } from '@/context/active-section-context';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const navItems = [
  {
    id: 1,
    name: 'Sign In',
    href: '/',
  },
  {
    id: 2,
    name: 'Pricing',
    href: '#pricing',
  },
] as const;

const MobileNav = () => {
  const { isMobileToggled } = useActiveContext();
  return (
    <AnimatePresence>
      {isMobileToggled && (
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          transition={{
            delay: 0.1,
            ease: 'easeInOut',
            duration: 0.5,
          }}
          className=" bg-gray-950/40 py-5 px-9 pb-5 backdrop-blur-md  rounded-md "
        >
          <div className="flex flex-col items-center gap-5">
            {navItems.map((item) => (
              <>
                <motion.a
                  className="text-[16px] font-work  flex items-center hover:scale-105 active:scale-100 duration-200 transition-all outline-none w-[fit-content] mt-5 pb-2"
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{
                    delay: item.id * 0.3,
                    ease: 'easeInOut',
                    duration: 0.5,
                  }}
                  href={item.href}
                  key={item.id}
                >
                  <p className=" text-white font-semibold ">{item.name}</p>
                </motion.a>
              </>
            ))}
            <motion.button
              variants={variants}
              initial="hidden"
              whileInView="visible"
              transition={{
                delay: 0.9,
                ease: 'easeInOut',
                duration: 0.5,
              }}
              className="border-[1px] fon-satoshi font-semibold border-[#008080] w-[fit-content]  rounded-[15px] text-[#FFFFFF] py-2 px-4 text-[14px] sm:text-[18px] tracking-[0.8px] hover:scale-110 active:scale-100px transition-all duration-200 hover:border-purple-400 hover:bg-[#008080] "
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default MobileNav;
