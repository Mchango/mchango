import React from 'react'

const WalletNav = () => {
    return (
        <>
            <div className='flex justify-left '>
                <div className='w-[75%]  ml-[21px]'>
                    <div className="text-[15px] tracking-[0.15px] text-center text-gray-500 border-b-[1.5px] border-[#ffffff33]  dark:border-gray-700">
                        <ul className="flex flex-wrap space-x-[40px] -mb-px mt-[40px] ">
                            <li className="me-2 flex ">
                                <div className="inline-block pb-[11px]  border-b-[1.5px] border-transparent rounded-t-lg hover:text-gray-600 hover:border-[#008080] active dark:border-[#008080] dark:hover:text-gray-300 border-b-[1.5px] rounded-t-lg" aria-current="page">Active Groups</div>
                                <div className='text-[#008080] border border-[#008080] w-[14px] h-[14px] rounded-[50%] text-[8px] tracking-[0.08px] ml-[6px] '>5</div>
                            </li>
                            <li className="me-2 flex">
                                <div className="inline-block pb-[11px] border-b-[1.5px] border-transparent rounded-t-lg hover:text-gray-600 hover:border-[#008080] dark:hover:text-gray-300">Inactive Groups</div>
                                <div className='text-[#008080] border border-[#008080] w-[14px] h-[14px] rounded-[50%] text-[8px] tracking-[0.08px] ml-[6px] '>5</div>
                            </li>
                            <li className="me-2 flex">
                                <div className="inline-block pb-[11px] border-b-[1.5px] border-transparent rounded-t-lg hover:text-gray-600 hover:border-[#008080] dark:hover:text-gray-300">Currently In Rotation </div>
                                <div className='text-[#008080] border border-[#008080] w-[14px] h-[14px] rounded-[50%] text-[8px] tracking-[0.08px] ml-[6px] '>5</div>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </>
    )
}

export default WalletNav