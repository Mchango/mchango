import Image from 'next/image';
import React from 'react';
import mchlogo from '../assets/mchlogo.svg';
import { TypingText } from './CustomTexts';
// import '../global.css'

const GatewayLanding = () => {
  return (
    <div className="flex justify-center mt-[53px] lg:mt-[88px] z-50">
      <div className="w-[80%] relative">
        <div className="flex mb-[21px] mx-auto justify-center items-center ">
          <Image
            src={mchlogo}
            alt="mchlogo"
            className="sm:w-[110px] sm:h-[100px] w-[60px] h-[50px] "
          />
          <h1 className=" text-[32px] sm:text-[42px] lg:text-[45px] font-lexend text-[#FFF] font-extrabold leading-[43px] lg:leading-normal my-auto ml-[15px] ">
            Mchango_
          </h1>
        </div>
        <h2 className=" text-[20px] sm:text-[50px] font-lexend font-bold leading-[27px] sm:leading-[50px]  text-gra tracking-wide text-center mb-[21px] z-20">
          Gateway to Smart Savings and Contributions
        </h2>
        <h3 className=" text-[14px] sm:text-[24px] leading-[19.1px] sm:leading-[32px]  font-work font-medium lg:leading-[33px] tracking-[0.72px] text-center z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4">
          Dive into collaborative savings, real-time insights, and a thriving
          community. Let's elevate your crypto journey together.
        </h3>
        <TypingText
          title="Begin contributing, saving, and growing."
          textStyles="text-[14px] sm:text-[20px] lg:text-[30px] font-work leading-[19.1px] font-medium sm:leading-[32px] tracking-[0.72px] sm:tracking-wider text-center builbtn-grad lg:mt-[30px] mt-[21px] mb-[52px]"
        />

        <div className="flex justify-center -mt-5 sm:mt-0 ">
          <button className="text-[16px]  sm:text-[20px] leading-[16.3px] lg:leading-normal  lg:tracking-[0.8px] text-white font-satoshi font-semibold py-[9px] sm:py-[18px] px-[14px] sm:px-[28px] rounded-[15px] bg-[#008080] hover:bg-[#096b6b] hover:text-white w-[fit-content] lg:h-[58px] hover:scale-110 active:scale-95 transition-all duration-200  shadow-md flex items-center z-50 ">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default GatewayLanding;
