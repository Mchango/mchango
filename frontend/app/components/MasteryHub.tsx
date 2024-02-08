import Image from 'next/image';
import React from 'react';
import mastery from '../assets/mastery.png';
import mobmastery from '../assets/mobmastery.png'

const MasteryHub = () => {
  return (
    <>
      <div className="flex justify-center mb-[150px]">
        <div className="w-full">
          <div className="relative">
            <div className="lg:absolute w-auto">
              <div className="lg:text-[40px] text:[24px] font-extrabold leading-[48px] -tracking:[3%] text-center lg:-tracking-[1.2px] text-[#FFFFFF] ">
                Mchango_ Mastery Hub
              </div>
              <div className="text-[16px] font-medium -tracking-[0.32px] lg:mx-[0px] mx-auto leading-[32px] my-[11px] lg:my-[22px] text-[#FFFFFF] w-[340px] lg:w-[367px]  ">
                Embark on a journey to financial empowerment with Mchango_.
                Discover a step-by-step guide to collaborative savings,
                real-time insights, and community-driven prosperity.
              </div>
              <button className="border-[1px] lg:mx-[0px] mx-auto lg:block flex justify-center items-center border-[#008080] w-[151px] h-[49px] rounded-[15px] text-[#FFFFFF] text-[16px] tracking-[0.8px] ">
                Get Started
              </button>
            </div>
            <Image src={mastery} alt="icon" className="hidden lg:relative lg:block" />
            <Image src={mobmastery} alt="icon" className="lg:hidden mx-auto mt-[33px] block" />

          </div>
        </div>
      </div>
    </>
  );
};

export default MasteryHub;
