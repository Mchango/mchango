import Image from 'next/image'
import React from 'react';
import basic from '../assets/basic.svg'

const Plan = () => {
  return (
    <>
    <div className='flex justify-center mb-[150px]'>
        <div className='w-full'>
            <div className='text-[#F1F1F1] text-[50px] font-extrabold mx-auto text-center leading-normal '>Find Your Perfect Plan</div>
            <div className='text-[24px] font-light leading-[34px] text-[#D0D0D0] w-[70%] mx-auto text-center mt-[14px] mb-[60px] '>Our transparent and accessible pricing structures are designed to cater to diverse needs. Choose a plan that suits you, whether you're an individual trader or part of a dynamic investment team</div>
            <div>
                <div className='grid grid-cols-3 justify-between' >
                    <div className='smartbg px-[40px] pt-[40px] '>
                        <Image src={basic} alt='icon' className='mb-[20px]'/>
                        <div className='text-[#00FFFF] text-[44px] font-medium tracking-[-1px] leading-normal '>Basic Plan</div>
                        <div className='text-[24px] leading-[32px] text-[#fff] w-[95%] mt-[14px] '>The Basic Plan is ideal for users new to collective savings. Start your journey towards financial goals with group savings power.</div>
                        <hr className='w-[90%] my-[28px] bg-[#E7EBFF] '/>
                        <div>
                            
                        </div>

                    </div>

                </div>
            </div>
        
        </div>


    </div>
    </>
  )
}

export default Plan