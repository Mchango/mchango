import Image from 'next/image'
import React from 'react';
import whitelogo from '../assets/whitelogo.svg'

const Landing = () => {
  return (
    <>
   <div className='flex justify-center'>
    <div className='w-full'>
      <div className='h-screen w-full bg-[url("https://res.cloudinary.com/dmye53wps/image/upload/v1699652923/mchango_m0fuc7.svg")] bg-cover bg-center '>
        <div className='flex w-[90%] justify-between mx-auto  '>
          <div className='mt-[26px]'>
            <Image src={whitelogo} alt='logo' className='' />
          </div>
          <div className=''>
            <div className='text-[#fff] tex-[18px] font-medium tracking-[0.36px] '>Sign Up</div>
          </div>

        </div>
      </div>

    </div>
   </div>
    </>
  )
}

export default Landing
