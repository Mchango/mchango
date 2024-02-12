'use client';

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

import { MenuIcon, X } from 'lucide-react';
import { useActiveContext } from '@/context/active-section-context';
import { useWallet } from '@/context/connectWallet';
import Link from 'next/link';

const navItems = [
  {
    id: 1,
    name: 'Sign In',
    href: '/signin',
  },
  {
    id: 2,
    name: 'Pricing',
    href: '#pricing',
  },
] as const;

const Navbar = () => {
  const router = useRouter();
  const { setIsMobileToggled, isMobileToggled } = useActiveContext();
  const { connectWallet, wallet, account } = useWallet();

  const toggleMenu = () => {
    setIsMobileToggled((prevIsMobileToggled) => !prevIsMobileToggled);
  };

  const handleNavLinks = {
    handleGetStartedToggled: () => {
      router.push('/signup');
    },

    handleSignInToggled: (routeName: string) => {
      if (routeName === '/signin') {
        try {
          connectWallet();
        } catch (error) {
          throw new MetaMaskError();
        }
      } else if (routeName === '#pricing') {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
  };

  return (
    <nav className="flex justify-center overflow-x-hidden relative z-50 ">
      <div className="lg:max-w-7xl w-full">
        <div className="flex w-[90%] items-center justify-between mx-auto pt-[26px]   ">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="/Logo.svg"
              alt="Mchango_"
              width={50}
              height={50}
              className="sm:w-[70px] sm:h-[70px]"
            />
          </div>

          {/**Mobile Menu */}

          <div className="block sm:hidden">
            {isMobileToggled ? (
              <X width={30} height={30} color="white" onClick={toggleMenu} />
            ) : (
              <MenuIcon
                width={30}
                height={30}
                color="white"
                onClick={toggleMenu}
              />
            )}
          </div>

          {/**Desktop Nav */}
          <div className=" hidden sm:flex flex-row items-center gap-2 sm:gap-5 w-[fit-content]">
            <div className="flex flex-row gap-2 items-center">
              {navItems.map((item) => (
                <React.Fragment key={item.id}>
                  <div className="flex flex-col gap-2 items-center group relative z-50">
                    <button
                      className="text-white text-[14px] sm:text-[18px] sm:leading-normal leading-[16.3px] font-semibold tracking-[0.36px] font-satoshi text-center my-auto mr-[9px] lg:mr-[29px] cursor-pointer hover:text-white group:hover:scale-110px active:scale-95 transition-all duration-200 "
                      onClick={() =>
                        handleNavLinks.handleSignInToggled(item.href)
                      }
                    >
                      {item.name}
                    </button>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-[80%] "></span>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <button
              className="border-[1px] fon-satoshi font-semibold border-[#008080] w-[fit-content]  rounded-[15px] text-[#FFFFFF] py-2 px-4 text-[14px] sm:text-[18px] tracking-[0.8px] hover:scale-110 active:scale-100px transition-all duration-200 hover:border-purple-400 hover:bg-[#008080] "
              onClick={() => handleNavLinks.handleGetStartedToggled()}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
