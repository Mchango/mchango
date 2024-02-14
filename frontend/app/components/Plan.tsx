import Image from 'next/image';
import React from 'react';
import basic from '../assets/basic.svg';
import Check from '../assets/Check.svg';
import premium from '../assets/premium.svg';
import Checkdark from '../assets/Checkdark.svg';
import { TitleText } from './CustomTexts';
import { PinContainer } from './3dPin';
import { BackgroundGradient } from './BackgroundGradient';

const Plan = () => {
  return (
    <div
      id="pricing"
      className="flex flex-col gap-5 justify-center items-center lg:mt-[100px] mb-[150px] padding-x"
    >
      <TitleText
        textStyles={`text-[20px] sm:text-[22px] lg:text-[42px] leading-[22px] font-semibold font-lexend  text-[#D9D9DB] lg:w-[734px]  tracking-wide justify-center self-center text-center lg:leading-normal`}
      >
        <p>Find Your Perfect Plan</p>
      </TitleText>
      <p className="text-[14px] sm:text-[18px] lg:text-[24px] font-work font-medium -tracking-[0.32p] leading-[32px] my-[12px] sm:my-[15px] w-[fit-content] justify-center text-center sm:text-white  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 ">
        Embark on a journey to financial empowerment with Mchango. Discover a
        step-by-step guide to collaborative savings, real-time insights, and
        community-driven prosperity.
      </p>
      <div className="flex flex-col sm:flex-row gap-[280px] sm:gap-[50px] lg:justify-center items-center mt-[80px] sm:mt-[100px]">
        {/**Basic Plan Card */}
        <PinContainer
          title="Basic Plan"
          href="/"
          className="w-[300px] h-[500px] bg-coolGray-950 bg-opacity-70 backdrop-blur-md rounded-[20px] p-[30px] flex flex-col gap-5 text-white"
        >
          <Image
            src={basic}
            alt="icon"
            width={70}
            height={70}
            className="self-center"
          />
          <div className="flex flex-col gap-3">
            <h3 className="font-lexend text-[16px] sm:text-[24px]">
              Basic Plan
            </h3>
            <p className="font-work text-[14px]  w-[fit-content]">
              The Basic Plan is ideal for users new to collective savings. Start
              your journey towards financial goals with group savings power.
            </p>

            {/**Plan Details */}
            <BackgroundGradient className="rounded-[20px] gap-1 p-[30px] w-[fit-content] flex flex-col">
              {/**Commision Fee */}
              <div className="flex flex-row gap-1 items-center w-[fit-content]">
                <Image src={Check} alt="icon" width={30} height={30} />
                <p className="font-Azeret text-[12px]  w-[fit-content]">
                  Commission fee: 3%
                </p>
              </div>

              {/**Subscription Max */}
              <div className="flex flex-row gap-1 items-center">
                <Image src={Check} alt="icon" width={30} height={30} />
                <p className="font-Azeret text-[12px]  w-[fit-content]">
                  max subscribers: 10
                </p>
              </div>

              {/**Subscription Fee */}
              <div className="flex flex-row gap-1 items-center">
                <Image src={Check} alt="icon" width={30} height={30} />
                <p className="font-Azeret text-[12px]  w-[fit-content]">
                  Subscription fee: 0 ETH
                </p>
              </div>
            </BackgroundGradient>
            <button className="border-[1px] fon-satoshi font-semibold border-[#008080] w-[fit-content]  rounded-[15px] text-[#FFFFFF] py-2 px-4 text-[14px] tracking-[0.8px] hover:scale-110 active:scale-100px transition-all duration-200 hover:border-purple-400 flex self-center ">
              Get Started
            </button>
          </div>
        </PinContainer>

        {/**Premium plan */}
        <PinContainer
          title="Best Offer"
          href="/"
          className="w-[300px] h-[500px] bg-coolGray-950 bg-opacity-70 backdrop-blur-md rounded-[20px] p-[30px] flex flex-col gap-5 text-white "
        >
          <Image
            src={premium}
            alt="icon"
            width={70}
            height={70}
            className="self-center"
          />
          <div className="flex flex-col gap-3">
            <h3 className="font-lexend text-[16px] sm:text-[24px]">
              Premium Plan
            </h3>
            <p className="font-work text-[14px]  w-[fit-content]">
              Elevate savings with the Premium Plan's advanced features and
              exclusive benefits, designed for accelerated financial success.
            </p>

            {/**Plan Details */}
            <BackgroundGradient className=" rounded-[20px] gap-1 p-[30px] w-[fit-content] flex flex-col">
              {/**Commision Fee */}
              <div className="flex flex-row gap-1 items-center w-[fit-content]">
                <Image src={Check} alt="icon" width={30} height={30} />
                <p className="font-Azeret text-[12px]  w-[fit-content]">
                  Commission fee: 1.5%
                </p>
              </div>

              {/**Subscription Max */}
              <div className="flex flex-row gap-1 items-center">
                <Image src={Check} alt="icon" width={30} height={30} />
                <p className="font-Azeret text-[12px]  w-[fit-content]">
                  max subscribers: 100
                </p>
              </div>

              {/**Subscription Fee */}
              <div className="flex flex-row gap-1 items-center">
                <Image src={Check} alt="icon" width={30} height={30} />
                <p className="font-Azeret text-[12px]  w-[fit-content]">
                  Subscription fee: 0.02 ETH
                </p>
              </div>
            </BackgroundGradient>
            <button className="border-[1px] fon-satoshi font-semibold border-[#008080] w-[fit-content]  rounded-[15px] text-[#FFFFFF] py-2 px-4 text-[14px] tracking-[0.8px] hover:scale-110 active:scale-100px transition-all duration-200 hover:border-purple-400 flex self-center ">
              Get Started
            </button>
          </div>
        </PinContainer>
      </div>
    </div>
  );
};

export default Plan;
