import Image from 'next/image'
import React from 'react';
import mastery from '../assets/mastery.png'

const MasteryHub = () => {
  return (
    <>
      <div className='flex justify-center mb-[150px]'>
        <div className='w-full'>
          <div className='relative'>
            <div className='absolute w-auto'>
              <div className='text-[40px] font-extrabold leading-[48px] -tracking-[1.2px] '>Mchango_ Mastery Hub</div>
              <div className='text-[16px] font-medium -tracking-[0.32p] leading-[32px] my-[22px]  '>Embark on a journey to financial empowerment with Mchango_. Discover a step-by-step guide to collaborative savings, real-time insights, and community-driven prosperity.</div>
              
            </div>
            <Image src={mastery} alt='icon' className='relative' />

          </div>
        </div>

      </div>
    </>
  )
}

export default MasteryHub