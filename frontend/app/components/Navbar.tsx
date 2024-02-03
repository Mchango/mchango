import Image from 'next/image'
import React from 'react';
import line from '../assets/line.svg';
import mobline from '../assets/mobline.png'

const Navbar = () => {
  return (
    <>
    <div className='flex justify-center'>
        <div className='lg:max-w-7xl w-full'>
        <div className='flex w-[90%] justify-between mx-auto pt-[26px] '>
          <div className=''>
            <div className='text-[24px] lg:text-[40px] text-[#FFF] font-semibold leading-[32.7px] lg:leading-normal'>Mchango_</div>
          </div>
          <div className='flex'>
            <div className='text-[#fff] lg:text-[20px] lg:leading-normal leading-[16.3px] font-semibold tracking-[0.36px] text-center my-auto mr-[9px] lg:mr-[29px] cursor-pointer hover:text-[teal] '>Sign In</div>
            <button className='text-[12px] leading-[16.3px] lg:leading-normal lg:text-[16px] lg:tracking-[0.8px] text-[#000000] py-[8px] lg:py-[18px] px-[14px] lg:px-[28px] rounded-[15px] bg-[#008080] hover:bg-[#096b6b] gap-[10px] lg:w-[210px] w-[97px] h-[32px] lg:h-[58px] '>Get Started</button>
          </div>
        </div>
        <Image src={line} alt='line' className='hidden lg:block mx-auto w-[90%]' />
        <Image src={mobline} alt='line' className='lg:hidden mx-auto w-[90%]' />
        </div>

    </div>
    </>
  )
}

export default Navbar