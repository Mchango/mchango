import Image from 'next/image'
import React from 'react';
import back from '../assets/back.png'
import file from '../assets/file.svg';


const CreateGroup = () => {
  return (
    <>
    <div className='flex justify-center '>
        <div className='w-full mt-[42px]'>
            <div className='ml-[53px]'>
                <div className='flex'>
                    <Image src={back} alt='png' className='' />
                    <div className='text-[24px] ml-[5px] font-medium text-[#fff] leading-[24.65px] my-auto '>To create a new thrift group, kindly fill out these details. </div>
                </div>
                <form className='mt-[25px] w-[506px] '>
                    <div className='flex flex-col mb-[25px]'>
                        <label className='text-[16px] leading-[16px] tracking-[0.4px] text-[#FFFFFF] '>Thrift Name</label>
                        <input className='mt-[17px] opacity-[0.8] rounded-[20px] text-[15px] font-semibold tracking-[0.1px] leading-[24px] text-[#000000] pl-[34px] py-[23px] w-[507px] outline outline-none border-[1px] border-[#F0F0F0] bg-[#021d1d] ' placeholder='Name'/>
                    </div>
                    <div className='flex flex-col mb-[25px]'>
                        <label className='text-[16px] leading-[16px] tracking-[0.4px] text-[#FFFFFF] '>Group’s descriptio/goal</label>
                        <input className='mt-[17px] opacity-[0.8] rounded-[20px] text-[15px] font-semibold tracking-[0.1px] leading-[24px] text-[#000000] pl-[34px] py-[23px] w-[507px] outline outline-none border-[1px] border-[#F0F0F0] bg-[#021d1d] ' placeholder='Write out what the group is set to achieve'/>
                    </div>
                    <div className='flex flex-col mb-[25px]'>
                        <label className='text-[16px] leading-[16px] tracking-[0.4px] text-[#FFFFFF] '>Collateral Value</label>
                        <input className='mt-[17px] opacity-[0.8] rounded-[20px] text-[15px] font-semibold tracking-[0.1px] leading-[24px] text-[#000000] pl-[34px] py-[23px] w-[507px] outline outline-none border-[1px] border-[#F0F0F0] bg-[#021d1d] ' placeholder='Collateral Value'/>
                    </div>
                    <div className='flex flex-col mb-[25px]'>
                        <label className='text-[16px] leading-[16px] tracking-[0.4px] text-[#FFFFFF] '>Plan Frequency</label>
                        <input className='mt-[17px] opacity-[0.8] rounded-[20px] text-[15px] font-semibold tracking-[0.1px] leading-[24px] text-[#000000] pl-[34px] py-[23px] w-[507px] outline outline-none border-[1px] border-[#F0F0F0] bg-[#021d1d] ' placeholder='Name'/>
                    </div>
                    <div className='flex items-center'>
                        <label htmlFor="dropzone-file" className='flex w-[197px] cursor-pointer hover:bg-bray-800 flex-col items-center justify-center h-[168px] border-[#fff] border-[1px] rounded-[20px] '>
                            <div>
                                <Image src={file} alt='file' className='mx-auto' />
                                <div className='mt-[20px] text-[12px] text-[#fff] leading-[19.51px] '>Upload Group Display Image</div>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" />
                        </label>

                    </div>
                    <div className='flex justify-center mt-[37px] '>
                    <button className='bg-[#008080] hover:bg-[#13a5a5] w-[204px] h-[53px] rounded-[15px] text-[20px] font-semibold leading-[26.65px] text-[#fff] '>Create Group</button>
                    </div>
                </form>

            </div>

        </div>
    </div>
    </>
  )
}

export default CreateGroup