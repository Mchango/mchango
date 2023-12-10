import Image from 'next/image'
import React from 'react';
import avatar from '../assets/avatar.svg'

const LoggedUser = () => {
  return (
    <>
    <div className='loggedUser rounded-[31px] border-[1px] border-[#008080] flex ml-[10px] '>
        <Image src={avatar} alt='avatar' className='ml-[7px] mr-[4px]' />
        <div className='text-[14px] text-[#fff] my-auto mr-[20px] '>TobiMoney</div>
    </div>
    </>
  )
}

export default LoggedUser