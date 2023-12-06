import React from 'react'

const SignupForm = () => {
  return (
    <>
    <div className='mx-auto'>
        <div className='text-[40px] font-bold text-[#FFFFFF] text-center mb-[21px] '>Sign Up</div>
        <form className='w-[61%] mx-auto '>
            <div className='flex flex-col mb-[39px]'>
                <label className='text-[16px] leading-[16px] tracking-[0.4px] text-[#FFFFFF] ml-[10px] '>Full Name</label>
                <input className='mt-[17px] opacity-[0.8] rounded-[20px] text-[20px] font-semibold tracking-[0.1px] leading-[24px] text-[#000000] pl-[34px] py-[23px] w-[507px] outline outline-none ' placeholder='Name'/>
            </div>
            <div className='flex flex-col mb-[39px]'>
                <label className='text-[16px] leading-[16px] tracking-[0.4px] text-[#FFFFFF] ml-[10px] '>Email</label>
                <input className='mt-[17px] opacity-[0.8] rounded-[20px] text-[20px] font-semibold tracking-[0.1px] leading-[24px] text-[#000000] pl-[34px] py-[23px] w-[507px] outline outline-none ' placeholder='example@gmail.com'/>
            </div>
            <div className='flex flex-col mb-[39px]'>
                <label className='text-[16px] leading-[16px] tracking-[0.4px] text-[#FFFFFF] ml-[10px] '>Username</label>
                <input className='mt-[17px] opacity-[0.8] rounded-[20px] text-[20px] font-semibold tracking-[0.1px] leading-[24px] text-[#000000] pl-[34px] py-[23px] w-[507px] outline outline-none ' placeholder='example@gmail.com'/>
            </div>
            <div className='flex flex-col mb-[39px]'>
                <label className='text-[16px] leading-[16px] tracking-[0.4px] text-[#FFFFFF] ml-[10px] '>Country</label>
                <input className='mt-[17px] opacity-[0.8] rounded-[20px] text-[20px] font-semibold tracking-[0.1px] leading-[24px] text-[#000000] pl-[34px] py-[23px] w-[507px] outline outline-none ' placeholder='Nigeria'/>
            </div>
            <div className='flex flex-col mb-[39px]'>
                <label className='text-[16px] leading-[16px] tracking-[0.4px] text-[#FFFFFF] ml-[10px] '> Phone Number</label>
                <input className='mt-[17px] opacity-[0.8] rounded-[20px] text-[20px] font-semibold tracking-[0.1px] leading-[24px] text-[#000000] pl-[34px] py-[23px] w-[507px] outline outline-none cursor-pointer hover:bg-[#008080] ' placeholder='+407'/>
            </div>
            <div className='flex justify-center mb-[100px]'>
            <button className='signupbtn text-[16px] tracking-[0.8px] text-[#fff] w-[165px] h-[58px] mx-auto '>
            Sign Up
            </button>
            </div>
        </form>
       
    </div>
    </>
  )
}

export default SignupForm