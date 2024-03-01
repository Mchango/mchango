'use server';

import Image from 'next/image';
import React from 'react';
import line from '../assets/line.svg';
import logoo from '../assets/logoo.svg';
import SignupForm from '../components/SignupForm';

const SignUp = () => {
  return (
    <div className='flex justify-center h-full w-full bg-[url("https://res.cloudinary.com/dmye53wps/image/upload/v1699652923/mchango_m0fuc7.svg")] bg-cover bg-center overflow-x-hidden '>
      <div className="flex flex-col justify-center w-full ">
        <div className="mb-[90px] pt-5 padding-x hidden sm:flex sm:flex-col">
          <h1 className="hidden sm:flex text-[30px]  text-[#FFF] font-semibold leading-normal font-lexend">
            Mchango_
          </h1>
          <Image
            src={line}
            alt="line"
            className="hidden sm:flex mx-auto w-full"
          />
        </div>
        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-col gap-5 items-center justify-center mb-[21px]">
            <div className="flex flex-row items-center gap-3">
              <Image
                src={logoo}
                alt="logo"
                width={50}
                height={50}
                className="sm:w-[80px] sm:h-[80px]"
              />
              <p className=" text-[40px] sm:text-[52px] font-lexend font-bold text-[#FFFFFF]  ">
                Mchango_
              </p>
            </div>
            <p className="signupgate flex flex-wrap text-center text-[24px] sm:text-[30px] font-bold mb-[21px] ">
              Gateway to Smart Savings and Contributions
            </p>
            <div className="mt-[50px]">
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
