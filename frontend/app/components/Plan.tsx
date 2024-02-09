import Image from 'next/image';
import React from 'react';
import basic from '../assets/basic.svg';
import Check from '../assets/Check.svg';
import premium from '../assets/premium.svg';
import Checkdark from '../assets/Checkdark.svg';
import { TitleText } from './CustomTexts';
import { PinContainer } from './3dPin';

const Plan = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center lg:mt-[100px] mb-[150px] padding-x">
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

            <div className="bg-gray-600 rounded-[20px] gap-1 p-[30px] w-[fit-content] flex flex-col">
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
            </div>
            <button className="border-[1px] fon-satoshi font-semibold border-[#008080] w-[fit-content]  rounded-[15px] text-[#FFFFFF] py-2 px-4 text-[14px] tracking-[0.8px] hover:scale-110 active:scale-100px transition-all duration-200 hover:border-purple-400 flex self-center ">
              Get Started
            </button>
          </div>
        </PinContainer>

        {/**Premium plan */}
        <PinContainer
          title="Basic Plan"
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

            <div className="bg-gray-600 rounded-[20px] gap-1 p-[30px] w-[fit-content] flex flex-col">
              {/**Commision Fee */}
              <div className="flex flex-row gap-1 items-center w-[fit-content]">
                <Image src={Checkdark} alt="icon" width={30} height={30} />
                <p className="font-Azeret text-[12px]  w-[fit-content]">
                  Commission fee: 1.5%
                </p>
              </div>

              {/**Subscription Max */}
              <div className="flex flex-row gap-1 items-center">
                <Image src={Checkdark} alt="icon" width={30} height={30} />
                <p className="font-Azeret text-[12px]  w-[fit-content]">
                  max subscribers: 100
                </p>
              </div>

              {/**Subscription Fee */}
              <div className="flex flex-row gap-1 items-center">
                <Image src={Checkdark} alt="icon" width={30} height={30} />
                <p className="font-Azeret text-[12px]  w-[fit-content]">
                  Subscription fee: 0.02 ETH
                </p>
              </div>
            </div>
            <button className="border-[1px] fon-satoshi font-semibold border-[#008080] w-[fit-content]  rounded-[15px] text-[#FFFFFF] py-2 px-4 text-[14px] tracking-[0.8px] hover:scale-110 active:scale-100px transition-all duration-200 hover:border-purple-400 flex self-center ">
              Get Started
            </button>
          </div>
        </PinContainer>

        {/* <div className="grid grid-cols-3 justify-between space-x-[10px]">
          <div className="smartbg px-[40px] pt-[40px] ">
            <Image src={basic} alt="icon" className="mb-[20px]" />
            <div className="text-[#00FFFF] text-[44px] font-medium tracking-[-1px] leading-normal ">
              Basic Plan
            </div>
            <div className="text-[24px] leading-[32px] text-[#fff] w-[95%] mt-[14px] ">
              The Basic Plan is ideal for users new to collective savings. Start
              your journey towards financial goals with group savings power.
            </div>
            <hr className="w-[90%] my-[28px] bg-[#E7EBFF] " />
            <div className="flex">
              <Image src={Check} alt="checks" className="mr-[16px]" />
              <div className="text-[24px] leading-[40px] text-[#0ff] ">
                Commission Fee: 3%
              </div>
            </div>
            <div className="flex mt-[12px] ">
              <Image src={Check} alt="checks" className="mr-[16px]" />
              <div className="text-[24px] leading-[40px] text-[#0ff] w-[80%] ">
                No of subscriibers: 10 max
              </div>
            </div>
            <div className="flex mt-[12px] ">
              <Image src={Check} alt="checks" className="mr-[16px]" />
              <div className="text-[24px] leading-[40px] text-[#0ff] w-[80%] ">
                Subscription Payment: 0 ETH
              </div>
            </div>
            <button className="text-[#00FFFF] rounded-[12px] pt-[18px] border-[1px] border-[#6D6D6D] mt-[44px] mx-auto flex justify-center mb-[40px] w-[320px] h-[60px] ">
              Get Started
            </button>
          </div>
          <div className="smartbg px-[40px] pt-[40px] ">
            <div className="flex mb-[20px]">
              <Image src={premium} alt="premium" className="" />
              <button className="text-[#FFFFFF] border-[1px] border-[#fff] bg-[rgba(255, 255, 255, 0.08)] rounded-[8px] py-[5px] px-[10px] text-[18px] font-light w-[103px] h-[38px] my-auto ml-[20px] leading-normal ">
                Best offer
              </button>
            </div>
            <div className="text-[#00FFFF] text-[44px] font-medium tracking-[-1px] leading-normal ">
              Premium Plan
            </div>
            <div className="text-[24px] leading-[32px] text-[#fff] w-[95%] mt-[14px] ">
              Elevate savings with the Premium Plan's advanced features and
              exclusive benefits, designed for accelerated financial success.{' '}
            </div>
            <hr className="w-[90%] my-[28px] bg-[#E7EBFF] " />
            <div className="flex">
              <Image src={Checkdark} alt="icon" className="mr-[16px]" />
              <div className="text-[24px] leading-[40px] text-[#1B223C] ">
                Commission Fee: 1.5%
              </div>
            </div>
            <div className="flex mt-[12px] ">
              <Image src={Checkdark} alt="icon" className="mr-[16px]" />
              <div className="text-[24px] leading-[40px] text-[#1B223C] w-[80%] ">
                No of subscriibers: 30 max
              </div>
            </div>
            <div className="flex mt-[12px] ">
              <Image src={Checkdark} alt="icon" className="mr-[16px]" />
              <div className="text-[24px] leading-[40px] text-[#1B223C] w-[80%] ">
                Subscription Payment: 0.05 ETH
              </div>
            </div>
            <button className="text-[#00FFFF] rounded-[12px] pt-[18px] border-[1px] border-[#6D6D6D] mt-[44px] mx-auto flex justify-center mb-[40px] w-[320px] h-[60px] ">
              Get Started
            </button>
          </div>
          <div className="smartbg px-[40px] pt-[40px] ">
            <Image src={basic} alt="icon" className="mb-[20px]" />
            <div className="text-[#00FFFF] text-[44px] font-medium tracking-[-1px] leading-normal ">
              Exclusive Plan
            </div>
            <div className="text-[24px] leading-[32px] text-[#fff] w-[95%] mt-[14px] ">
              Start with the Basic Plan for an entry into collective savings.
              Begin your journey to financial goals and benefit from group
              savings power.
            </div>
            <hr className="w-[90%] my-[28px] bg-[#E7EBFF] " />
            <div className="flex">
              <Image src={Check} alt="checks" className="mr-[16px]" />
              <div className="text-[24px] leading-[40px] text-[#0ff] ">
                Commission Fee: 1%
              </div>
            </div>
            <div className="flex mt-[12px] ">
              <Image src={Check} alt="checks" className="mr-[16px]" />
              <div className="text-[24px] leading-[40px] text-[#0ff] w-[80%] ">
                No of subscriibers: 50 max
              </div>
            </div>
            <div className="flex mt-[12px] ">
              <Image src={Check} alt="checks" className="mr-[16px]" />
              <div className="text-[24px] leading-[40px] text-[#0ff] w-[80%] ">
                Subscription Payment: 0.1 ETH
              </div>
            </div>
            <button className="text-[#00FFFF] rounded-[12px] pt-[18px] border-[1px] border-[#6D6D6D] mt-[44px] mx-auto flex justify-center mb-[40px] w-[320px] h-[60px] ">
              Get Started
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Plan;
