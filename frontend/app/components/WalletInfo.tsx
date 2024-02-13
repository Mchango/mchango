import Image from 'next/image';
import tokensData from '../data.json';
import React from 'react';
import copy from '../assets/copy.svg';
import ETH from '../assets/ETH.svg';
import loader from '../assets/loader.svg';
import loadplay from '../assets/loadplay.svg';

interface Token {
  balance: string;
  totalGroups: number;
  grpsInRotation: number;
  grpsYetinRotation: number;
  grpName: string;
  collateral: string;
  nextContribt: string;
  membersNo: number;
  dateCreated: string;
  address: string;
}

const WalletInfo = () => {
  const tokens: Token[] = tokensData;

  return (
    <>
      {tokens.map((token, index) => (
        <div key={index}>
          <div className="flex mt-[24px] ml-[21px] space-x-[56px] ">
            <div className='pl-[19px] pt-[12px] w-[265px] h-[161px] bg-[url("https://res.cloudinary.com/dmye53wps/image/upload/v1702411000/walletbg_w83xdc.svg")] '>
              <div className="text-[32px] font-black leading-[24px] text-[#fff] mb-[9.7px] ">
                Wallet
              </div>
              <div className="flex mb-[30px] ">
                <div className="text-[12px] leading-[12px] text-[#E8EFFB] mr-[5px] ">
                  {token.address}
                </div>
                <Image src={copy} alt="copy" className="cursor-pointer" />
              </div>
              <div className="flex">
                <Image src={ETH} alt="ETH" className="" />
                <div className="text-[32px] font-extrabold leading-[32px] text-[#fff] ">
                  {token.balance}
                </div>
              </div>
            </div>
            <div className='pt-[12px] pl-[10px] w-[472px] h-[161px] bg-[url("https://res.cloudinary.com/dmye53wps/image/upload/v1702411055/groupbg_kte5zo.svg")]  '>
              <div className="text-[32px] font-black leading-[24px] text-[#fff]">
                Group Info
              </div>
              <div className="flex mt-[18.32px] space-x-[27px] ">
                <div className="flex my-auto ">
                  <Image src={loader} alt="icon" className="mr-[10px]" />
                  <div className="text-[15px] font-medium text-[#A5AAB5] leading-[12px] tracking-[0.3px]  ">
                    Total No Of Groups:{' '}
                    <p className="text-[#FFFFFF] font-semibold mt-[9px] ">
                      {token.totalGroups}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex my-auto ">
                    <Image src={loader} alt="icon" className="mr-[10px]" />
                    <div className="text-[15px] font-medium text-[#A5AAB5] leading-[12px] tracking-[0.3px]  ">
                      Groups In Rotation{' '}
                      <p className="text-[#FFFFFF] font-semibold mt-[9px] ">
                        {token.grpsInRotation}
                      </p>
                    </div>
                  </div>
                  <div className="flex mt-[26px] ">
                    <Image src={loadplay} alt="icon" className="mr-[10px]" />
                    <div className="text-[15px] font-medium text-[#A5AAB5] leading-[12px] tracking-[0.3px]  ">
                      Groups Yet To Be In Rotation{' '}
                      <p className="text-[#FFFFFF] font-semibold mt-[9px] ">
                        {token.grpsYetinRotation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WalletInfo;
