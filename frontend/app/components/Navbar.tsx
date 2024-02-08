import Image from 'next/image';
import React from 'react';
import line from '../assets/line.svg';
import mobline from '../assets/mobline.png';

const Navbar = () => {
  return (
    <div className="flex justify-center overflow-x-hidden relative z-50">
      <div className="lg:max-w-7xl w-full">
        <div className="flex w-[90%] justify-between mx-auto pt-[26px] ">
          <div className="">
            <div className="text-[18px] sm:text-[24px] font-lexend lg:text-[40px] text-[#FFF] font-extrabold tracking-wide leading-[32.7px] lg:leading-normal">
              Mchango_
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-5">
            <div className="text-white text-[16px] sm:text-[20px] sm:leading-normal leading-[16.3px] font-semibold tracking-[0.36px] font-satoshi text-center my-auto mr-[9px] lg:mr-[29px] cursor-pointer hover:text-white hover:scale-110px active:scale-95 transition-all duration-200">
              Sign In
            </div>
            <button className="text-[16px] animate-pulse sm:text-[20px] leading-[16.3px] lg:leading-normal  lg:tracking-[0.8px] text-white font-satoshi font-semibold py-[9px] sm:py-[18px] px-[14px] sm:px-[20px] rounded-[15px] bg-[#008080] hover:bg-[#096b6b] hover:text-white w-[fit-content] lg:h-[58px] hover:scale-100 active:scale-95 transition-all duration-200  shadow-md flex items-center ">
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
    </div>
  );
};

export default Navbar;
