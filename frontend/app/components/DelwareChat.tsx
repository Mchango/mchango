import React from 'react'
import tokensData from '../data.json';
import Image from 'next/image';
import adex from '../assets/adex.png'

interface Token {
    delwaretime: string;
    delmemb1name: string;
    delmsgtime1: string;
    delchat1: string;
    delmemb2name: string;
    delmsgtime2: string;
    delchat2: string;
    delmemb3name: string;
    delmsgtime3: string;
    delchat3: string;

}

const DelwareChat = () => {

    const tokens: Token[] = tokensData;
    return (
        <>
            {tokens.map((token, index) => (
                <div className='text-[#FFFFFF]' key={index}>
                    <div className='w-full mx-auto mb-[25px] text-[11px] leading-[16px] text-[#717171] text-center '>{token.delwaretime}</div>
                    <div className='flex'>
                        <Image src={adex} alt='profile-img' className='my-auto ' />
                        <div className='ml-[12px] '>
                            <div className='flex'>
                                <div className='text-[16px] leading-[22px] font-extrabold '>{token.delmemb1name}</div>
                                <div className='text-[#717171] text-[11px] leading-[16px] my-auto ml-[5px] '>{token.delmsgtime1}</div>
                            </div>
                            <div className='text-[15px] leading-[24px] font-light lg:w-[564px] '>{token.delchat1}</div>
                        </div>
                    </div>
                </div>
            ))}

        </>
    )
}

export default DelwareChat