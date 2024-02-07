import Image from 'next/image'
import React from 'react'
import invest from '../assets/invest.svg';
import collab from '../assets/collab.svg';
import auto from '../assets/auto.svg'

const SmartCrypto = () => {
  return (
    <>
      <div className='flex justify-center mt-[70px] lg:mt-[76px] mb-[150px] '>
        <div className='w-full'>
          <div className='lg:text-[50px] text-[20px] leading-[22px] font-extrabold lg:leading-[55px] text-[#D9D9DB] lg:w-[734px] mx-auto text-center lg:leading-normal '>Smart Crypto Investing <br />and Community Empowerment</div>
          <div className=''>
            <div className='grid lg:grid-cols-3 justify-between'>
              <div className='smartbg py-[32px] px-[10px]'>
                <Image src={invest} alt='icon' className='w-[300px] h-[200px] lg:h-[245px] lg:w-[387px] mx-auto ' />
                <div className='text-[#F1F1F1] text-[24px] leading-[26.4px] lg:text-[30px] font-bold lg:leading-[33px] text-center mx-auto mt-[43px] mb-[23px] w-[253px] lg:w-[316px] '>Real-Time Investment Insights</div>
                <div className='text-[#fff] text-[16px] leading-[25.1px] lg:text-[22px] lg:leading-[34.62px] text-center mx-auto w-[336px] lg:w-[388px]  '>Stay informed with live investment data. Mchango_ provides real-time insights, alerts, and analysis for informed decision-making in the cryptocurrency market.</div>
                <div className='text-[20px] font-bold text-[#418FAA] mx-auto text-center lg:mt-[45px] mt-[20px] cursor-pointer underline underline-offset-4 hover:text-[#fff] '>Get Started</div>
              </div>
              <div className='smartbg py-[32px] px-[10px]'>
                <Image src={collab} alt='icon' className='lg:w-[359px] w-[248px] h-[200px] lg:h-[254px] mx-auto ' />
                <div className='text-[#F1F1F1] text-[24px] leading-[26.4px] lg:text-[30px] font-bold lg:leading-[33px] text-center mx-auto mt-[32.6px] mb-[23px] '>Community Collaboration for Profitability</div>
                <div className='text-[#fff] text-[16px] leading-[25.1px] lg:text-[22px] lg:leading-[34.62px] text-center mx-auto w-[313px] lg:w-[388px] '>Boost profits through community collaboration. Join forces, share wisdom, manage risks, and achieve greater profitability in the volatile market.</div>
                <div className='text-[20px] font-bold text-[#418FAA] mx-auto text-center mt-[20px] lg:mt-[76px] cursor-pointer underline underline-offset-4 hover:text-[#fff] '>Get Started</div>
              </div>
              <div className='smartbg py-[32px] px-[10px]'>
                <Image src={auto} alt='icon' className='lg:w-[363px] w-[262.8px] h-[200px] lg:h-[257px]  mx-auto ' />
                <div className='text-[#F1F1F1]  text-[24px] leading-[26.4px] lg:text-[30px] font-bold lg:leading-[33px] lg:w-[373px] mx-auto mt-[15px] text-center lg:mt-[28px] mb-[20px] lg:mb-[55px]' >Automated Group Savings</div>
                <div className='text-[#fff] lg:text-[22px] text-[16px] leading-[25.1px] lg:leading-[34.62px] text-center mx-auto  w-[327px] lg:w-[388px]'>Join or create savings groups effortlessly. Mchango_ automates contributions, ensuring disciplined group savings for common financial goals.</div>
                <div className='text-[20px] font-bold text-[#418FAA] mx-auto text-center mt-[20px] lg:mt-[76px] cursor-pointer underline underline-offset-4 hover:text-[#fff] '>Get Started</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default SmartCrypto