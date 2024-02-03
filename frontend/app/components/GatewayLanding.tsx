import Image from 'next/image'
import React from 'react';
import mchlogo from '../assets/mchlogo.svg';
// import '../global.css'

const GatewayLanding = () => {
  return (
    <>
    <div className='flex justify-center mt-[53px] lg:mt-[88px]'>
        <div className='w-[80%]'>
            <div className='flex mb-[21px] mx-auto justify-center '>
                <Image src={mchlogo} alt='mchlogo' className='lg:w-[101px] lg:h-[90px] w-[50px] h-[40px] ' />
                <div className='lg:text-[52px] text-[32px] text-[#FFF] font-semibold font-bold leading-[43px] lg:leading-normal my-auto ml-[15px] '>Mchango_</div>
            </div>
            <div className="lg:text-[48px] text-[20px] leading-[27px] lg:leading-normal font-bold text-gra text-center mb-[21px]">Gateway to Smart Savings and Contributions</div>
            <div className='text-[24px] text-[#E6DEFF] font-bold leading-[33px] tracking-[0.72px] text-center'>
            Dive into collaborative savings, real-time insights, and a thriving community. Let's elevate your crypto journey together.
            </div>
            <div className='text-[24px] font-bold leading-[33px] tracking-[0.72px] text-center builbtn-grad mt-[30px] mb-[52px] '>Begin contributing, saving, and growing. </div>
            <div className='flex justify-center '>
            <button className='text-[16px] tracking-[0.8px] text-[#fff] py-[18px] px-[28px] rounded-[15px] bg-[#008080] hover:bg-[#096b6b] gap-[10px] w-[210px] h-[58px] '>Get Started</button>
            </div>
        </div>
        
    </div>
    </>
  )
}

export default GatewayLanding