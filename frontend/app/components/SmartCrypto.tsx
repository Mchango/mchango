import Image from 'next/image'
import React from 'react'
import invest from '../assets/invest.svg';
import collab from '../assets/collab.svg';
import auto from '../assets/auto.svg'

const SmartCrypto = () => {
  return (
    <>
      <div className='flex justify-center mt-[76px]'>
        <div className='w-full'>
          <div className='text-[50px] font-extrabold leading-[55px] text-[#D9D9DB] w-[734px] mx-auto text-center leading-normal '>Smart Crypto Investing <br />and Community Empowerment</div>
          <div className=''>
            <div className='grid grid-cols-3 justify-between'>
              <div className='smartbg py-[32px] px-[10px]'>
                <Image src={invest} alt='icon' className='' />
                <div className='text-[#F1F1F1] text-[30px] font-bold leading-[33px] text-center mx-auto mt-[43px] mb-[23px] '>Real-Time Investment Insights</div>
                <div className='text-[#fff] text-[22px] leading-[34.62px] text-center mx-auto '>Stay informed with live investment data. Mchango_ provides real-time insights, alerts, and analysis for informed decision-making in the cryptocurrency market.</div>
                <div className='text-[20px] font-bold text-[#418FAA] mx-auto text-center mt-[45px] cursor-pointer underline underline-offset-4 hover:text-[#fff] '>Get Started</div>
              </div>
              <div className='smartbg py-[32px] px-[10px]'>
                <Image src={collab} alt='icon' className='' />
                <div className='text-[#F1F1F1] text-[30px] font-bold leading-[33px] text-center mx-auto mt-[16.6px] mb-[23px] '>Community Collaboration for Profitability</div>
                <div className='text-[#fff] text-[22px] leading-[34.62px] text-center mx-auto '>Boost profits through community collaboration. Join forces, share wisdom, manage risks, and achieve greater profitability in the volatile market.</div>
                <div className='text-[20px] font-bold text-[#418FAA] mx-auto text-center mt-[45px] cursor-pointer underline underline-offset-4 hover:text-[#fff] '>Get Started</div>
              </div>
              <div className='smartbg py-[32px] px-[10px]'>
                <Image src={auto} alt='icon' className='' />
                <div className='text-[#F1F1F1] text-[30px] font-bold leading-[33px] w-[373px] mx-auto mt-[28px] mb-[55px]' >Automated Group Savings</div>
                <div className='text-[#fff] text-[22px] leading-[34.62px] text-center mx-auto '>Join or create savings groups effortlessly. Mchango_ automates contributions, ensuring disciplined group savings for common financial goals.</div>
                <div className='text-[20px] font-bold text-[#418FAA] mx-auto text-center mt-[45px] cursor-pointer underline underline-offset-4 hover:text-[#fff] '>Get Started</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default SmartCrypto