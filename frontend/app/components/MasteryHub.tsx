import Image from 'next/image';
import React from 'react';
import mastery from '../assets/mastery.png';
import { CardStack } from './CardStack';
import { TitleText } from './CustomTexts';

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
        <TitleText
          textStyles={`text-[20px] sm:text-[24px] leading-[22px] font-semibold font-lexend  text-[#D9D9DB] lg:w-[734px]   tracking-wide lg:leading-normal `}
        >
          <p>Mchango Mastery</p>
        </TitleText>
        <p className="text-[14px] font-work font-medium -tracking-[0.32p] leading-[32px] my-[12px] sm:my-[15px] w-[fit-content]  sm:w-[390px]  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 ">
          Embark on a journey to financial empowerment with Mchango_. Discover a
          step-by-step guide to collaborative savings, real-time insights, and
          community-driven prosperity.
        </p>
        <button className="border-[1px] font-work font-medium border-[#008080] w-[151px] h-[49px] rounded-[15px] text-[#FFFFFF] text-[14px] tracking-[0.8px] hover:scale-110 active:scale-100px transition-all duration-200 ">
          Get Started
        </button>
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
