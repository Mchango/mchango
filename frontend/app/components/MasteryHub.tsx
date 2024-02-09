import Image from 'next/image';
import React from 'react';
import mastery from '../assets/mastery.png';
<<<<<<< HEAD
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
=======
import { CardStack } from './CardStack';

const cardItems = [
  {
    id: 1,
    name: 'Create your account',
    designation: 'Mchango Operations',
    content: <p>Sign up on Mchango_ by creating your account.</p>,
  },
  {
    id: 2,
    name: 'Explore savings groups',
    designation: 'Mchango Operations',
    content: <p>Browse and explore savings grouos</p>,
  },
  {
    id: 3,
    name: 'Automate contributions',
    designation: 'Mchango Operations',
    content: <p>Setup automated contributions to your chosen savings group</p>,
  },
  {
    id: 4,
    name: 'Collaborate with the community',
    designation: 'Mchango Operations',
    content: <p>Share your insights and learn from others</p>,
  },
];

const MasteryHub = () => {
  return (
    <div className="flex flex-col sm:flex-row lg:flex-col justify-center  mb-[50px] w-full relative">
      <div className=" padding-x relative flex flex-col gap-3 lg:absolute  lg:left-0 sm:z-50">
        <h3
          className={`text-[32px] sm:text-[40px] font-lexend font-semibold leading-[48px] -tracking-[1.2px] text-[#FFFFFF] `}
        >
          Mchango_ Mastery
        </h3>

        <p className="text-[18px] font-work font-medium -tracking-[0.32p] leading-[32px] my-[12px] sm:my-[15px] w-[fit-content]  sm:w-[390px]  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 ">
          Embark on a journey to financial empowerment with Mchango_. Discover a
          step-by-step guide to collaborative savings, real-time insights, and
          community-driven prosperity.
        </p>
        <button className="border-[1px] font-work font-medium border-[#008080] w-[151px] h-[49px] rounded-[15px] text-[#FFFFFF] text-[16px] tracking-[0.8px] hover:scale-110 active:scale-100px transition-all duration-200 ">
          Get Started
        </button>
>>>>>>> 4180ac6f667a373650d9582b7114ceacc593bc04
      </div>

      <div className="mt-[80px] w-full mb-5 padding-x sm:p-2">
        <CardStack items={cardItems} />
      </div>
      <Image
        src={mastery}
        alt="icon"
        className="relative hidden sm:hidden lg:flex mt-0 lg:mt-[200px]"
      />
    </div>
  );
};

export default MasteryHub;
