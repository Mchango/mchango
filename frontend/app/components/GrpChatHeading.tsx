import React from 'react';
import tokensData from '../data.json';
import Image from 'next/image';
import add from '../assets/add.svg'

interface Token {
    delaremebers: number;
    delwaretime: string
}

const GrpChatHeading = () => {

    const tokens: Token[] = tokensData;

  return (
    <>
    {tokens.map((token, index) => (
    <div className='flex justify-center w-[688px] w-full ' key={index}>
        <div className='w-full  '>
        <div className='flex justify-between text-[#fff] w-full '>
            <div className='text-[20px] leading-[24px] font-extrabold '>
            Delware Savers
            <div className='text-[12px] leading-[16px] '>{token.delaremebers} members</div>
            </div>
            <div className='flex'>
              <div>
                <Image src={add} alt='add' className='mx-auto' /> 
                <div>Add Member</div>
              </div>

            </div>
        </div>

        </div>

    </div>
     ))}
    </>
  )
}

export default GrpChatHeading