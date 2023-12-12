
import tokensData from '../data.json'
import React from 'react'

interface Token {
    address: string;
    balance: string;
    totalGroups: number;
    grpsInRotation: number;
    grpsYetinRotation: number;
    grpName: string;
    collateral: string;
    nextContribt: string;
    membersNo: number;
    dateCreated: string
}

const WalletInfo = () => {

    const tokens: Token[] = tokensData;

  return (
    <>
    <div className='flex justify-center'>
        {tokens.map((token, index) => (
            <div key={index}>
                 <div>
            <div className='flex'>
                <div className='pl-[19px] pt-[12px] bg-[url("https://res.cloudinary.com/dmye53wps/image/upload/v1702411000/walletbg_w83xdc.svg")] '>
                    <div className='text-[32px] font-black leading-[24px] text-[#fff] mb-[9.7px] '>Wallet</div>
                    <div className=''>
                        {token.address}
                    </div>
                </div>

            </div>
        </div>
            </div>
        ))}
       

    </div>
    </>
  )
}

export default WalletInfo