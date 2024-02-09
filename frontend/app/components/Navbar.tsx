import Image from 'next/image';
import React from 'react';

import line from '../assets/line.svg';
import mobline from '../assets/mobline.png';

const Navbar = () => {
  return (
    <nav className="flex justify-center overflow-x-hidden relative z-50">
      <div className="lg:max-w-7xl w-full">
        <div className="flex w-[90%] justify-between mx-auto pt-[26px] ">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="/Logo.svg"
              alt="Mchango_"
              width={50}
              height={50}
              className="sm:w-[70px] sm:h-[70px]"
            />
            {/* <p className="text-[18px] sm:text-[24px] font-lexend lg:text-[40px] text-[#FFF] font-extrabold tracking-wide leading-[32.7px] lg:leading-normal">
              Mchango_
            </p> */}
          </div>
          <div className="flex flex-row items-center gap-2 sm:gap-5 w-[fit-content]">
            <div className="flex flex-col gap-2 items-center group relative z-50">
              <p className="text-white text-[14px] sm:text-[20px] sm:leading-normal leading-[16.3px] font-semibold tracking-[0.36px] font-satoshi text-center my-auto mr-[9px] lg:mr-[29px] cursor-pointer hover:text-white group:hover:scale-110px active:scale-95 transition-all duration-200 ">
                Sign In
              </p>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-[80%] "></span>
            </div>

            <button className="border-[1px] fon-satoshi font-semibold border-[#008080] w-[fit-content]  rounded-[15px] text-[#FFFFFF] py-2 px-4 text-[14px] tracking-[0.8px] hover:scale-110 active:scale-100px transition-all duration-200 hover:border-purple-400 hover:bg-[#008080] ">
              Get Started
            </button>
          </div>
        </div>
        {/* <Image
            src={line}
            alt="line"
            className="hidden lg:block mx-auto w-[90%]"
          />
          <Image
            src={mobline}
            alt="line"
            className="lg:hidden mx-auto w-[90%]"
          /> */}
      </div>
    </nav>
  );
};

export default Navbar;
