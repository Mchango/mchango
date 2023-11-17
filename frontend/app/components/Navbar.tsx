import Image from 'next/image'
import React from 'react';
import line from '../assets/line.svg'

const Navbar = () => {
  return (
    <>
    <div className='flex justify-center'>
        <div className='lg:max-w-7xl w-full'>
        <div className='flex w-[90%] justify-between mx-auto pt-[26px] '>
          <div className=''>
            <div className='text-[40px] text-[#FFF] font-semibold leading-normal'>Mchango_</div>
          </div>
          <div className='flex'>
            <div className='text-[#fff] text-[20px] font-semibold tracking-[0.36px] text-center my-auto mr-[29px] cursor-pointer hover:text-[teal] '>Sign In</div>
            <button className='text-[16px] tracking-[0.8px] text-[#fff] py-[18px] px-[28px] rounded-[15px] bg-gradient-to-r from-teal-800 to-purple-700 hover:to-teal-700 gap-[10px] w-[210px] h-[58px] '>Get Started</button>
          </div>
        </div>
        <Image src={line} alt='line' className='mx-auto w-[90%]' />
        </div>

    </div>
    </>
  )
}

export default Navbar