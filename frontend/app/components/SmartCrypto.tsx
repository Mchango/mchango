import Image from 'next/image';
import React from 'react';
import invest from '../assets/invest.svg';
import collab from '../assets/collab.svg';
import auto from '../assets/auto.svg';
import { BackgroundGradient } from './BackgroundGradient';

const SmartCrypto = () => {
  return (
    <>
      <div className="flex justify-center mt-[70px] lg:mt-[76px] mb-[50px] ">
        <div className="w-full">
          <h3 className='"text-[20px] sm:text-[24px] leading-[22px] font-semibold font-lexend  text-[#D9D9DB] lg:w-[734px] mx-auto text-center tracking-wide lg:leading-normal "'>
            Smart Crypto Investing <br className="sm:hidden" />
            and Community Empowerment
          </h3>

          <div className=" flex justify-center items-center">
            <div className="grid lg:grid-cols-3 gap-5 justify-between">
              {/**Investment Card */}
              <div className="py-[32px] px-[10px] flex items-center justify-center">
                <BackgroundGradient className=" py-3  ">
                  <Image
                    src={invest}
                    alt="icon"
                    className="w-[250px] h-[150px] lg:h-[245px] lg:w-[387px] mx-auto "
                  />
                  <p className="text-[#F1F1F1] text-[18px] leading-[27px] lg:text-[30px] font-lexend font-extrabold lg:leading-[33px] tracking-wide text-center mx-auto mt-[43px] mb-[23px] w-[253px] lg:w-[316px] ">
                    Real-Time Investment Insights
                  </p>

                  <p className="text-[#fff] font-work font-medium text-[14px] leading-[25.1px] lg:text-[22px] lg:leading-[34.62px] text-center mx-auto w-[336px] lg:w-[388px] -pt-1 ">
                    Stay informed with live investment data. Mchango_ provides
                    real-time insights, alerts, and analysis for informed
                    decision-making in the cryptocurrency market.
                  </p>
                  <button className="text-[14x] text-white font-lexend font-extrabold mx-auto text-center lg:mt-[45px] mt-[20px] cursor-pointer underline underline-offset-4 hover:scale-100 active:scale-90 transition-all duration-200 flex self-center ">
                    Get Started
                  </button>
                </BackgroundGradient>
              </div>

              {/**Collaboration Card */}
              <div className=" py-[32px] px-[10px]">
                <BackgroundGradient className=" py-3  ">
                  <Image
                    src={collab}
                    alt="icon"
                    className="w-[250px] h-[150px] lg:h-[245px] lg:w-[387px] mx-auto "
                  />
                  <p className="text-[#F1F1F1] text-[18px] leading-[27px] lg:text-[30px] tracking-wide font-lexend font-extrabold lg:leading-[33px] text-center mx-auto mt-[43px] mb-[23px] w-[253px] lg:w-[316px] ">
                    Community Collaboration for Profitability
                  </p>
                  <p className="text-[#fff] font-work font-medium text-[14px] leading-[25.1px] lg:text-[22px] lg:leading-[34.62px] text-center mx-auto w-[336px] lg:w-[388px]  ">
                    Boost profits through community collaboration. Join forces,
                    share wisdom, manage risks, and achieve greater
                    profitability in the volatile market.
                  </p>
                  <button className="text-[14x] text-white font-lexend font-extrabold mx-auto text-center lg:mt-[45px] mt-[20px] cursor-pointer underline underline-offset-4 hover:scale-100 active:scale-90 transition-all duration-200 flex self-center ">
                    Get Started
                  </button>
                </BackgroundGradient>
              </div>

              {/**Automated Card */}
              <div className=" py-[32px] px-[10px]">
                <BackgroundGradient className="py-3">
                  <Image
                    src={auto}
                    alt="icon"
                    className="w-[250px] h-[170px] lg:h-[245px] lg:w-[387px] mx-auto "
                  />
                  <p className="text-[#F1F1F1] text-[18px] leading-[27px] tracking-wide lg:text-[30px] font-lexend font-extrabold lg:leading-[33px] text-center mx-auto mt-[43px] mb-[23px] w-[253px] lg:w-[316px] ">
                    Automated Group Savings
                  </p>
                  <p className="text-[#fff] font-work font-medium text-[14px] leading-[25.1px] lg:text-[22px] lg:leading-[34.62px] text-center mx-auto w-[336px] lg:w-[388px] pt-9 ">
                    Join or create savings groups effortlessly. Mchango_
                    automates contributions, ensuring disciplined group savings
                    for shared financial objectives.
                  </p>
                  <button className="text-[14x] text-white font-lexend font-extrabold mx-auto text-center lg:mt-[45px] mt-[20px] cursor-pointer underline underline-offset-4 hover:scale-100 active:scale-90 transition-all duration-200 flex self-center ">
                    Get Started
                  </button>
                </BackgroundGradient>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmartCrypto;
