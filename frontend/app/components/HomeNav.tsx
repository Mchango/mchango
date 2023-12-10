import Image from 'next/image'
import React from 'react';
import search from '../assets/search.svg'

const HomeNav = () => {
    return (
        <>
            <div className='flex justify-center ml-[21px] '>
                <div>
                    <div className='flex mt-[24px] '>
                        <div className="relative justify-center w-[655px] mx-auto ">
                            <div className="absolute inset-y-0 h-[40px] left-0 flex items-center pl-[20.4px] pointer-events-none my-auto ">
                                <Image src={search} alt='search' className='' />
                            </div>
                            <input
                                className="bg-[#021d1d] border-[1px] border-[#008080] text-[16px] pl-[43px] w-[655px] h-[50px] text-[#A1A2AF] pl-[52px] mx-auto rounded-[30px] outline outline-none "
                                placeholder="Search..."
                            />
                        </div>
                        <div className='flex'>
                            

                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default HomeNav