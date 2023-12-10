import React from 'react';
import Image from 'next/image';
import mchlogo from '../assets/mchlogo.svg';
import home from '../assets/home.svg';
import chat from '../assets/chat.svg';
import group from '../assets/group.svg';
import upgrade from '../assets/upgrade.svg';
import profile from '../assets/profile.svg';
import rocket from '../assets/rocket.svg'
import Link from 'next/link';

const SideNav = () => {
    return (
        <>
            <div className='flex justify-center bg-[#011717]'>
                <div className=' w-[239px] pb-[81px] px-[24px] pt-[24px] '>
                    <div className='flex mb-[50px] '>
                        <Image src={mchlogo} alt='mchlogo' className='w-[38px] h-[39px] ' />
                        <div className='text-[25px] font-bold text-[#fff] ml-[9px] ' >Mchango_</div>
                    </div>
                    <div className='grid grid-cols-1 space-y-[53px] '>
                        <Link href='/home'>
                        <div className='flex space-x-[24px] '>
                            <Image src={home} alt='home' className='' />
                            <div className='text-[20px] leading-[28px] text-[#EFEFEF] cursor-pointer hover:text-[#006565] '>Home</div>
                        </div>
                        </Link>
                        <div className='flex space-x-[24px] '>
                            <Image src={chat} alt='chat' className='' />
                            <div className='text-[20px] leading-[28px] text-[#EFEFEF] cursor-pointer hover:text-[#006565] '>Chat</div>
                        </div>
                        <div className='flex space-x-[24px] '>
                            <Image src={group} alt='group' className='' />
                            <div className='text-[20px] leading-[28px] text-[#EFEFEF] cursor-pointer hover:text-[#006565] '>Groups</div>
                        </div>
                        <div className='flex space-x-[24px] '>
                            <Image src={upgrade} alt='upgrade' className='' />
                            <div className='text-[20px] leading-[28px] text-[#EFEFEF] cursor-pointer hover:text-[#006565] '>Upgrade</div>
                        </div>
                        <div className='flex space-x-[24px] '>
                            <Image src={profile} alt='profile' className='' />
                            <div className='text-[20px] leading-[28px] text-[#EFEFEF] cursor-pointer hover:text-[#006565] '>Profile</div>
                        </div>
                    </div>
                    <div className='relative mt-[46px] '>
                        <Image src={rocket} alt='rocket' className='-mb-[130px] mx-auto' />
                        <div className='rocket pt-[130px] '>
                            <div className='text-[12px] font-semibold text-[#fff] text-center w-[90%] mx-auto mt-[3px] mb-[8.8px] '>Want to upgrade to pro to get more exciting features?</div>
                            <div className='flex justify-center pb-[26.8px] '>
                            <button className='text-[12px] font-medium text-[#fff] w-[119px] h-[34px] rounded-[20.8px] bg-[#000000] mx-auto hover:bg-[#141313] '>Upgrade now</button>
                            </div> 
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default SideNav