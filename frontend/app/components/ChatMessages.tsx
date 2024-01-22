import Image from 'next/image'
import React from 'react';
import linedot from '../assets/linedot.svg';
import search from '../assets/search.svg';
import tokensData from '../data.json';
import peep from '../assets/peep.svg';
import ticks from '../assets/ticks.png'

interface Token {
chat1: string;
chat1time: string;
chat1members: string;
chat1totalcont: string;
chat2: string
chat3: string
chat3time: string;
chat3members: string
chat3totalcont: string
chat4: string
chat4time: string
chat4members: string
chat4totalcont: string
}

const ChatMessages = () => {

  const tokens: Token[] = tokensData;
  return (
    <>
 {tokens.map((token, index) => (
      <div className='w-[373px] flex justify-center  ' key={index}>
        <div className='w-full  '>
          <div className='flex justify-between '>
            <div className='text-[#E3E8E7] text-[24px] '>Messages</div>
            <Image src={linedot} alt='dots' className='' />
          </div>
          <div className='my-[47px] '>
            <div className="relative w-[373px] ">
              <div className="absolute inset-y-0 h-[40px] left-0 flex items-center pl-[20.4px] pointer-events-none my-auto ">
                <Image src={search} alt='search' className=' w-[24px] h-[24px] ' />
              </div>
              <input
                className="bg-[#fff] border-[1px] text-[16px] pl-[43px] w-[373px] h-[48px] text-[#171C1B] pl-[52px] mx-auto rounded-[31px] outline outline-none "
                placeholder="Search for chats..."
              />
            </div>
          </div>
          <div className=''>
            <div className='chatcard text-[#fff] py-[39px] font-bold px-[31px] w-[371px]  '>
              <div className=' text-[24px] leading-[24px] font-bold tracking-[0.5px] mb-[12px] '>{token.chat1}</div>
              <div className='text-[15px] leading-[20px] font-bold tracking-[0.3px] my-[16.5px] '>{token.chat1time}</div>
              <div className='flex justify-between '>
                <div className='flex'>
                <Image src={peep} alt='svg' className=''/>
                <div className='text-[10px] leading-[15px] font-bold text-[#fff] my-auto ml-[4px] '>{token.chat1members}</div>
                </div>
                <Image src={ticks} alt='tick' className='' />
              </div>
              <div className='flex mt-[12px] '>
              <Image src={peep} alt='svg' className=''/>
              <div className='text-[10px] leading-[15px] font-bold text-[#fff] my-auto ml-[4px] '>Total Contribution: {token.chat1totalcont}</div>
              </div>
            </div>
          </div>
          <div  className='mx-auto text-[#FFFFFF] '>
            <div className='w-[308px] mt-[32px] mx-auto '>
              <div className='text-[24px] leading-[24px] tracking-[0.5px] '>{token.chat2}</div>
              <div className='text-[15px] leading-[20px] tracking-[0.3px] my-[12px] '>{token.chat1time}</div>
              <div className='flex justify-between my-[12px] '>
                <div className='flex'>
                <Image src={peep} alt='svg' className=''/>
                <div className='text-[10px] leading-[15px] font-bold text-[#fff] my-auto ml-[4px] '>{token.chat1members}</div>
                </div>
                <div className='w-[24px] h-[24px] rounded-[50%] bg-[#FD0D0099] text-[#fff] flex justify-center '>3</div>
              </div>
              <div className='flex mt-[12px] mb-[25px] '>
              <Image src={peep} alt='svg' className=''/>
              <div className='text-[10px] leading-[15px] font-bold text-[#fff] my-auto ml-[4px] '>Total Contribution: {token.chat1totalcont}</div>
              </div>
              <hr className='bg-[#DDDDDD]'/>
            </div>
            <div className='w-[308px] mt-[32px] mx-auto '>
              <div className='text-[24px] leading-[24px] tracking-[0.5px] '>{token.chat3}</div>
              <div className='text-[15px] leading-[20px] tracking-[0.3px] my-[12px] '>{token.chat3time}</div>
              <div className='flex justify-between my-[12px] '>
                <div className='flex'>
                <Image src={peep} alt='svg' className=''/>
                <div className='text-[10px] leading-[15px] font-bold text-[#fff] my-auto ml-[4px] '>{token.chat3members}</div>
                </div>
                <div className='w-[24px] h-[24px] rounded-[50%] bg-[#FD0D0099] text-[#fff] flex justify-center '>2</div>
              </div>
              <div className='flex mt-[12px] mb-[25px] '>
              <Image src={peep} alt='svg' className=''/>
              <div className='text-[10px] leading-[15px] font-bold text-[#fff] my-auto ml-[4px] '>Total Contribution: {token.chat3totalcont}</div>
              </div>
              <hr className='bg-[#DDDDDD]'/>
            </div>
            <div className='w-[308px] mt-[32px] mx-auto '>
              <div className='text-[24px] leading-[24px] tracking-[0.5px] '>{token.chat4}</div>
              <div className='text-[15px] leading-[20px] tracking-[0.3px] my-[12px] '>{token.chat4time}</div>
              <div className='flex justify-between my-[12px] '>
                <div className='flex'>
                <Image src={peep} alt='svg' className=''/>
                <div className='text-[10px] leading-[15px] font-bold text-[#fff] my-auto ml-[4px] '>{token.chat4members}</div>
                </div>
                <div className='w-[24px] h-[24px] rounded-[50%] bg-[#FD0D0099] text-[#fff] flex justify-center '>4</div>
              </div>
              <div className='flex mt-[12px] mb-[25px] '>
              <Image src={peep} alt='svg' className=''/>
              <div className='text-[10px] leading-[15px] font-bold text-[#fff] my-auto ml-[4px] '>Total Contribution: {token.chat4totalcont}</div>
              </div>
              <hr className='bg-[#DDDDDD]'/>
            </div>
          </div>

        </div>
      </div>
       ))}
    </>
  )
}

export default ChatMessages