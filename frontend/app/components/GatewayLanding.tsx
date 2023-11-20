import Image from 'next/image'
import React from 'react';
import mchlogo from '../assets/mchlogo.svg';
// import '../global.css'

const GatewayLanding = () => {
  return (
    <>
    <div className='flex justify-center mt-[88px]'>
        <div className='w-[80%]'>
            <div className='flex mb-[21px] mx-auto justify-center '>
                <Image src={mchlogo} alt='mchlogo' className='' />
                <div className='text-[52px] text-[#FFF] font-bold leading-normal my-auto ml-[15px] '>Mchango_</div>
            </div>
            <div className="text-[48px] font-bold text-gra leading-normal mb-[21px]">Gateway to Smart Savings and Contributions</div>
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