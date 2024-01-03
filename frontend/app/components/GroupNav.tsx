import React from 'react'

const GroupNav = () => {
    return (
        <>
            <div className='flex justify-left '>
                <div className='w-[75%]  ml-[64px]'>
                    <div className="text-[15px] tracking-[0.15px] text-center text-gray-500 border-b-[1.5px] border-[#ffffff33]  dark:border-gray-700">
                        <ul className="flex flex-wrap space-x-[40px] -mb-px mt-[40px] ">
                            <li className="me-2 flex ">
                                <div className="inline-block pb-[11px]  border-b-[1.5px] border-transparent rounded-t-lg hover:text-gray-600 hover:border-[#008080] active dark:border-[#008080] dark:hover:text-gray-300 border-b-[1.5px] rounded-t-lg" aria-current="page">All Groups</div>
                                <div className='text-[#fff] border border-[#008080] w-[21px] h-[14px] rounded-[140px] text-[8px] tracking-[0.08px] ml-[6px] '>350</div>
                            </li>
                            <li className="me-2 flex">
                                <div className="inline-block pb-[11px] border-b-[1.5px] border-transparent rounded-t-lg hover:text-gray-600 hover:border-[#008080] dark:hover:text-gray-300">Active Groups</div>
                                <div className='text-[#fff] border border-[#008080] w-[21px] h-[14px] rounded-[140px] text-[8px] tracking-[0.08px] ml-[6px] '>100</div>
                            </li>
                            <li className="me-2 flex">
                                <div className="inline-block pb-[11px] border-b-[1.5px] border-transparent rounded-t-lg hover:text-gray-600 hover:border-[#008080] dark:hover:text-gray-300">Inactive Groups </div>
                                <div className='text-[#fff] border border-[#008080] w-[21px] h-[14px] rounded-[140px] text-[8px] tracking-[0.08px] ml-[6px] '>50</div>
                            </li>
                        </ul>
                    </div>
                    <form className="">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-[20px] pointer-events-none">
                                <svg className="w-[13px] text-gray-500 dark:text-gray-400 mt-[17px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                className="inp bg-[#021d1d] border border-[#fff] text-white text-[12px] pl-[40px] w-[249px] h-[35px] mt-[20px] rounded-[30px] outline outline-none "
                            />
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default GroupNav