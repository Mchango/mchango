import React from 'react';
import Submit_Btn from './Submit_Btn';
import { handleGetSignUpDataFromForm } from '@/utils/subscription';

const SignupForm = () => {
  return (
    <div className="flex flex-col justify-center w-[400px] sm:w-[500px] border border-gray-400 rounded-[20px] bg-gray-600/10 backdrop-blur-md pt-5 ">
      <h3 className="text-[28px] sm:text-[30px] font-lexend font-bold text-[#FFFFFF] text-center mb-[21px] ">
        Sign Up
      </h3>
      <form
        action={async (FormData) => {
          'use server';
          await handleGetSignUpDataFromForm(FormData);
        }}
        className=" flex flex-col gap-[39px] justify-center self-center  "
      >
        <div className="flex flex-col gap-3 ">
          <label className="text-[16px] leading-[16px] tracking-[0.4px] text-[#FFFFFF]  ">
            Full Name
          </label>
          <input
            placeholder="Name"
            name="name"
            required
            className="opacity-[0.8] rounded-[20px]  text-[16px] sm:text-[20px] font-semibold tracking-[0.1px] leading-[24px] p-5 w-[fit-content] outline-none placeholder:text-[16px] placeholder:font-Azeret placeholder:text-gray-950"
          />
        </div>

        {/**Email Input*/}
        <div className="flex flex-col gap-3 ">
          <label className="text-[16px] leading-[16px] tracking-[0.4px] text-[#FFFFFF]  ">
            Email
          </label>
          <input
            placeholder="example@gmail.com"
            name="mail"
            required
            className="opacity-[0.8] rounded-[20px] text-[16px] sm:text-[20px] font-semibold tracking-[0.1px] leading-[24px] p-5 w-[fit-content] outline-none placeholder:text-[16px] placeholder:font-Azeret placeholder:text-gray-950 "
          />
        </div>

        {/**Username Input */}
        <div className="flex flex-col gap-3 ">
          <label className="text-[16px] leading-[16px] tracking-[0.4px] text-[#FFFFFF]  ">
            Username
          </label>
          <input
            placeholder="Username"
            name="username"
            required
            className="opacity-[0.8] rounded-[20px] text-[16px] sm:text-[20px] font-semibold tracking-[0.1px] leading-[24px] p-5 w-[fit-content] outline-none placeholder:text-[16px] placeholder:font-Azeret placeholder:text-gray-950"
          />
        </div>

        {/**Country Input */}
        <div className="flex flex-col gap-3 ">
          <label className="text-[16px] leading-[16px] tracking-[0.4px] text-[#FFFFFF]  ">
            Country
          </label>
          <input
            placeholder="Nigeria"
            name="country"
            required
            className="opacity-[0.8] rounded-[20px] text-[16px] sm:text-[20px] font-semibold tracking-[0.1px] leading-[24px] p-5 w-[fit-content] outline-none placeholder:text-[16px] placeholder:font-Azeret placeholder:text-gray-950"
          />
        </div>

        {/**PhoneNo Input */}
        <div className="flex flex-col gap-3 ">
          <label className="text-[16px] leading-[16px] tracking-[0.4px] text-[#FFFFFF]  ">
            Phone Number
          </label>
          <input
            placeholder="+234"
            name="phone"
            required
            className="opacity-[0.8] rounded-[20px] text-[16px] sm:text-[20px] font-semibold tracking-[0.1px] leading-[24px] p-5 w-[fit-content] outline-none placeholder:text-[16px] placeholder:font-Azeret placeholder:text-gray-950"
          />
        </div>

        {/**Signup Button */}
        <div className="flex justify-center mb-[100px] mt-[50px]">
          <Submit_Btn
            backgroundColor="signupbtn"
            name="Sign up"
            padding="px-5 py-3"
            fontColor="text-white"
            fontSize="text-[16px]"
          />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
