import React from 'react';
import SideNav from '../components/SideNav';
import loader from '../assets/loader.svg';
import loadplay from '../assets/loadplay.svg';
import Image from 'next/image';
import tokensData from '../data.json';
import GroupEvents from '../components/GroupEvents';
import GroupNav from '../components/GroupNav';
import GroupLists from '../components/GroupLists';

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

const Groups = () => {
  const tokens: Token[] = tokensData;
  return (
    <>
      <div className="bg-[#021D1D] flex justify-center ">
        <div className="w-full lg:max-w-[1400px]">
          <div className="flex">
            <SideNav />
            {tokens.map((token, index) => (
              <div className="w-full mt-[48px] ">
                <div key={index}>
                  <div className='pt-[12px] pl-[10px] w-[472px] h-[161px] ml-[48px] bg-[url("https://res.cloudinary.com/dmye53wps/image/upload/v1702411055/groupbg_kte5zo.svg")]  '>
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
                          <Image
                            src={loader}
                            alt="icon"
                            className="mr-[10px]"
                          />
                          <div className="text-[15px] font-medium text-[#A5AAB5] leading-[12px] tracking-[0.3px]  ">
                            Groups In Rotation{' '}
                            <p className="text-[#FFFFFF] font-semibold mt-[9px] ">
                              {token.grpsInRotation}
                            </p>
                          </div>
                        </div>
                        <div className="flex mt-[26px] ">
                          <Image
                            src={loadplay}
                            alt="icon"
                            className="mr-[10px]"
                          />
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
                <GroupEvents />
                <GroupNav />
                <GroupLists />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Groups;
