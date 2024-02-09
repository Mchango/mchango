import Image from 'next/image';
import React from 'react';
import mchlogo from '../assets/mchlogo.svg';
import { TitleText, TypingText } from './CustomTexts';

const GatewayLanding = () => {
  return (
    <div className="flex justify-center mt-[53px] lg:mt-[88px] z-50">
      <div className="w-[80%] relative">
        <div className="flex mb-[21px] mx-auto justify-center items-center ">
          {/* <Image
            src={mchlogo}
            alt="mchlogo"
            className="sm:w-[110px] sm:h-[100px] w-[60px] h-[50px] "
          /> */}

          {/**Mchango Hero */}
          <h1
            className={`text-[40px] sm:text-[50px] lg:text-[70px] font-lexend text-[#FFF] font-extrabold leading-[43px] lg:leading-normal my-auto ml-[15px] `}
          >
            Mchango_
          </h1>
        </div>

        {/**Mchango Hero Description*/}
        <h2 className=" text-[14px] sm:text-[50px] font-lexend font-bold leading-[32px] sm:leading-[50px]  text-gra tracking-wider text-center mb-[21px] z-20">
          Gateway to Smart Savings and Contributions
        </h2>

        {/**Hero Text */}
        <h3
          className={`text-[14px] sm:text-[24px] leading-[22px] sm:leading-[32px]  font-work font-medium lg:leading-[33px] tracking-[0.72px] text-center z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4`}
        >
          {' '}
          Dive into collaborative savings, real-time insights, and a thriving
          community. Let's elevate your crypto journey together.
        </h3>

        <div className="flex justify-center">
          <TypingText
            title="Begin contributing, saving, and growing."
            textStyles="text-[14px] sm:text-[20px] lg:text-[30px] font-lexend leading-[19.1px] font-medium sm:leading-[32px] tracking-[0.72px] sm:tracking-wider text-center builbtn-grad lg:mt-[30px] mt-[21px] mb-[52px]"
          />
        </div>

        <div className="flex justify-center -mt-5 sm:mt-0 ">
          <button className="border-[1px] fon-satoshi font-semibold border-[#008080] w-[fit-content]  rounded-[15px] text-[#FFFFFF] py-2 px-4 sm:px-6 text-[14px] sm:text-[20px] tracking-[0.8px] hover:scale-110 active:scale-100px transition-all duration-200 hover:border-purple-400 bg-[#008080] ">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default GatewayLanding;
