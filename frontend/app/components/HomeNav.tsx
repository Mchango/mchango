import Image from 'next/image'
import React from 'react';
import search from '../assets/search.svg'
import NotificationBell from './NotificationBell';
import LoggedUser from './LoggedUser';

const HomeNav: React.FC = () => {
    return (
        <>
            <div className='flex justify-center ml-[21px] '>
                <div className='w-full'>
                    <div className='flex mt-[24px] justify-between '>
                        <div className="relative w-[655px] ">
                            <div className="absolute inset-y-0 h-[40px] left-0 flex items-center pl-[20.4px] pointer-events-none my-auto ">
                                <Image src={search} alt='search' className='-mt-[10px]' />
                            </div>
                            <input
                                className="bg-[#021d1d] border-[1px] border-[#008080] text-[16px] pl-[43px] w-[655px] h-[50px] text-[#A1A2AF] pl-[52px] mx-auto rounded-[31px] outline outline-none "
                                placeholder="Search..."
                            />
                        </div>
                        <div className='flex mr-[45px] '>
                            <NotificationBell notificationCount={6}  />
                            <LoggedUser />

                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default HomeNav