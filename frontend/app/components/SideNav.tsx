import React from 'react';
import Image from 'next/image';
import mchlogo from '../assets/mchlogo.svg';
import home from '../assets/home.svg';
import chat from '../assets/chat.svg';
import group from '../assets/group.svg';
import upgrade from '../assets/upgrade.svg';
import profile from '../assets/profile.svg'

const SideNav = () => {
    return (
        <>
            <div className='flex justify-center bg-[#011717]'>
                <div className=' w-[239px] h-[900px] px-[24px] pt-[24px] '>
                    <div className='flex mb-[50px] '>
                        <Image src={mchlogo} alt='mchlogo' className='w-[38px] h-[39px] ' />
                        <div className='text-[25px] font-bold text-[#fff] ml-[9px] ' >Mchango_</div>
                    </div>
                    <div className='grid grid-cols-1 space-y-[53px] '>
                        <div className='flex space-x-[24px] '>
                            <Image src={home} alt='home' className='' />
                            <div className='text-[20px] leading-[28px] text-[#EFEFEF] '>Home</div>
                        </div>
                        <div className='flex space-x-[24px] '>
                            <Image src={chat} alt='chat' className='' />
                            <div className='text-[20px] leading-[28px] text-[#EFEFEF] '>Chat</div>
                        </div>
                        <div className='flex space-x-[24px] '>
                            <Image src={group} alt='group' className='' />
                            <div className='text-[20px] leading-[28px] text-[#EFEFEF] '>Groups</div>
                        </div>
                        <div className='flex space-x-[24px] '>
                            <Image src={upgrade} alt='upgrade' className='' />
                            <div className='text-[20px] leading-[28px] text-[#EFEFEF] '>Upgrade</div>
                        </div>
                        <div className='flex space-x-[24px] '>
                            <Image src={profile} alt='profile' className='' />
                            <div className='text-[20px] leading-[28px] text-[#EFEFEF] '>Profile</div>
                        </div>
                    </div>
                    <div className='relative'>
                        

                    </div>

                </div>

            </div>
        </>
    )
}

export default SideNav