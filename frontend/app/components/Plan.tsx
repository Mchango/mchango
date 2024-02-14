import Image from 'next/image'
import React from 'react';
import basic from '../assets/basic.svg';
import Check from '../assets/Check.svg';
import premium from '../assets/premium.svg';
import Checkdark from '../assets/Checkdark.svg'

const Plan = () => {
    return (
        <>
            <div className='flex justify-center mb-[150px]'>
                <div className='w-full'>
                    <h3 className={`text-[#F1F1F1] text-[24px] sm:text-[50px] font-lexend font-extrabold mx-auto text-center leading-normal` }>Find Your Perfect Plan</h3>
                    <p className='text-[14px] sm:text-[24px] font-light leading-[34px] text-[#D0D0D0] w-[85%] sm:w-[70%] mx-auto text-center mt-[14px] mb-[60px] '>Our transparent and accessible pricing structures are designed to cater to diverse needs. Choose a plan that suits you, whether you're an individual trader or part of a dynamic investment team</p>
                    <div>
                        <div className='grid lg:grid-cols-3 justify-between space-x-[10px]' >
                            <div className='smartbg px-[40px] pt-[40px] '>
                                <Image src={basic} alt='icon' className='mb-[20px]' />
                                <div className='text-[#00FFFF] text-[44px] font-medium tracking-[-1px] leading-normal '>Basic Plan</div>
                                <div className='text-[24px] leading-[32px] text-[#fff] w-[95%] mt-[14px] '>The Basic Plan is ideal for users new to collective savings. Start your journey towards financial goals with group savings power.</div>
                                <hr className='w-[90%] my-[28px] bg-[#E7EBFF] ' />
                                <div className='flex'>
                                    <Image src={Check} alt='checks' className='mr-[16px]' />
                                    <div className='text-[24px] leading-[40px] text-[#0ff] '>Commission Fee: 3%</div>
                                </div>
                                <div className='flex mt-[12px] '>
                                    <Image src={Check} alt='checks' className='mr-[16px]' />
                                    <div className='text-[24px] leading-[40px] text-[#0ff] w-[80%] '>No of subscriibers: 10 max</div>
                                </div>
                                <div className='flex mt-[12px] '>
                                    <Image src={Check} alt='checks' className='mr-[16px]' />
                                    <div className='text-[24px] leading-[40px] text-[#0ff] w-[80%] '>Subscription Payment: 0 ETH</div>
                                </div>
                                <button className='text-[#00FFFF] rounded-[12px] pt-[18px] border-[1px] border-[#6D6D6D] mt-[44px] mx-auto flex justify-center mb-[40px] w-[320px] h-[60px] '>
                                    Get Started
                                </button>
                            </div>
                            <div className='smartbg px-[40px] pt-[40px] '>
                                <div className='flex mb-[20px]'>
                                    <Image src={premium} alt='premium' className='' />
                                    <button className='text-[#FFFFFF] border-[1px] border-[#fff] bg-[rgba(255, 255, 255, 0.08)] rounded-[8px] py-[5px] px-[10px] text-[18px] font-light w-[103px] h-[38px] my-auto ml-[20px] leading-normal '>Best offer</button>
                                </div>
                                <div className='text-[#00FFFF] text-[44px] font-medium tracking-[-1px] leading-normal '>Premium Plan</div>
                                <div className='text-[24px] leading-[32px] text-[#fff] w-[95%] mt-[14px] '>Elevate savings with the Premium Plan's advanced features and exclusive benefits, designed for accelerated financial success. </div>
                                <hr className='w-[90%] my-[28px] bg-[#E7EBFF] ' />
                                <div className='flex'>
                                    <Image src={Checkdark} alt='icon' className='mr-[16px]' />
                                    <div className='text-[24px] leading-[40px] text-[#1B223C] '>Commission Fee: 1.5%</div>
                                </div>
                                <div className='flex mt-[12px] '>
                                    <Image src={Checkdark} alt='icon' className='mr-[16px]' />
                                    <div className='text-[24px] leading-[40px] text-[#1B223C] w-[80%] '>No of subscriibers: 30 max</div>

                                </div>
                                <div className='flex mt-[12px] '>
                                    <Image src={Checkdark} alt='icon' className='mr-[16px]' />
                                    <div className='text-[24px] leading-[40px] text-[#1B223C] w-[80%] '>Subscription Payment: 0.05 ETH</div>
                                </div>
                                <button className='text-[#00FFFF] rounded-[12px] pt-[18px] border-[1px] border-[#6D6D6D] mt-[44px] mx-auto flex justify-center mb-[40px] w-[320px] h-[60px] '>
                                    Get Started
                                </button>
                            </div>
                            <div className='smartbg px-[40px] pt-[40px] '>
                                <Image src={basic} alt='icon' className='mb-[20px]' />
                                <div className='text-[#00FFFF] text-[44px] font-medium tracking-[-1px] leading-normal '>Exclusive Plan</div>
                                <p className='text-[24px] leading-[32px] text-[#fff] w-[95%] mt-[14px] '>Start with the Basic Plan for an entry into collective savings. Begin your journey to financial goals and benefit from group savings power.</p>
                                <hr className='w-[90%] my-[28px] bg-[#E7EBFF] ' />
                                <div className='flex'>
                                    <Image src={Check} alt='checks' className='mr-[16px]' />
                                    <div className='text-[24px] leading-[40px] text-[#0ff] '>Commission Fee: 1%</div>
                                </div>
                                <div className='flex mt-[12px] '>
                                    <Image src={Check} alt='checks' className='mr-[16px]' />
                                    <div className='text-[24px] leading-[40px] text-[#0ff] w-[80%] '>No of subscriibers: 50 max</div>
                                </div>
                                <div className='flex mt-[12px] '>
                                    <Image src={Check} alt='checks' className='mr-[16px]' />
                                    <div className='text-[24px] leading-[40px] text-[#0ff] w-[80%] '>Subscription Payment: 0.1 ETH</div>
                                </div>
                                <button className='text-[#00FFFF] rounded-[12px] pt-[18px] border-[1px] border-[#6D6D6D] mt-[44px] mx-auto flex justify-center mb-[40px] w-[320px] h-[60px] '>
                                    Get Started
                                </button>
                            </div>

                        </div>
                    </div>

                </div>


            </div>
        </>
    )
}

export default Plan