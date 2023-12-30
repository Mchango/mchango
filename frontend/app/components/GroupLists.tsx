import React from 'react'
import tokensData from '../data.json' 
import Image from 'next/image';
import adv from '../assets/adv.png';
import dot from '../assets/dot.svg';
import locate from '../assets/locate.png';
import doll from '../assets/doll.png';
import people from '../assets/people.png';
import ticky from '../assets/ticky.png'

interface Token {
    nameofgrp: string;
    grpdate: string;
    grpether: string;
    dateTime: string;
    grpno: number;
} 

const GroupLists = () => {

    const tokens: Token[] = tokensData;
  return (
    <>
    {
        tokens.map((token, index) => (
            <div key={index} className='flex justify-center '>
              <div className='w-full mt-[34px]'>
                <div className='ml-[64px]'>
                  <div className='grid grid-cols-2 '>
                    <div className='grpcard1 pl-[19px] pt-[12px] pr-[16px] mb-[55px] '>
                    <div className='flex justify-between mb-[16px] '>
                      <Image src={adv} alt='adv' className='' />
                      <Image src={dot} alt='dot' className='' />
                    </div>
                    <div className='text-[26px] font-extrabold leading-[31.2px] text-[#fff] mb-[6px] '>{token.nameofgrp}</div>
                    <div className='text-[12px] font-semibold leading-[13.2px] mb-[12px] text-[#fff] '>{token.grpdate}</div>
                    <div className='grid grid-cols-4'>
                      <div className='w-[91px] '>
                        <Image src={locate} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Group Admin Address</div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                      <div className='w-[91px] '>
                        <Image src={doll} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Collateral Amount</div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                      <div className='w-[107px] '>
                        <Image src={people} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Total <p>No of Members</p></div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpno}</div>
                      </div>
                      <div className='w-[91px] '>
                        <Image src={ticky} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Group <p>State</p></div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                    </div>
                    <div className='mx-auto w-full flex justify-center mt-[14px] mb-[34px] '>
                      <button className='grpbtnn text-[20px] mx-auto font-bold leading-[24px] tracking-[0.1px] text-[#00000] w-[343px] h-[52px] '>View Group</button>
                    </div>
                    </div>
                    <div className='grpcard1 pl-[19px] pt-[12px] pr-[16px] mb-[55px] ml-[35px] '>
                    <div className='flex justify-between mb-[16px] '>
                      <Image src={adv} alt='adv' className='' />
                      <Image src={dot} alt='dot' className='' />
                    </div>
                    <div className='text-[26px] font-extrabold leading-[31.2px] text-[#fff] mb-[6px] '>{token.nameofgrp}</div>
                    <div className='text-[12px] font-semibold leading-[13.2px] mb-[12px] text-[#fff] '>{token.grpdate}</div>
                    <div className='grid grid-cols-4'>
                      <div className='w-[91px] '>
                        <Image src={locate} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Group Admin Address</div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                      <div className='w-[91px] '>
                        <Image src={doll} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Collateral Amount</div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                      <div className='w-[107px] '>
                        <Image src={people} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Total <p>No of Members</p></div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpno}</div>
                      </div>
                      <div className='w-[91px] '>
                        <Image src={ticky} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Group <p>State</p></div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                    </div>
                    <div className='mx-auto w-full flex justify-center mt-[14px] mb-[34px] '>
                      <button className='grpbtnn text-[20px] mx-auto font-bold leading-[24px] tracking-[0.1px] text-[#00000] w-[343px] h-[52px] '>View Group</button>
                    </div>
                    </div>
                    <div className='grpcard1 pl-[19px] pt-[12px] pr-[16px] mb-[55px] space-x-[0px] '>
                    <div className='flex justify-between mb-[16px] '>
                      <Image src={adv} alt='adv' className='' />
                      <Image src={dot} alt='dot' className='' />
                    </div>
                    <div className='text-[26px] font-extrabold leading-[31.2px] text-[#fff] mb-[6px] '>{token.nameofgrp}</div>
                    <div className='text-[12px] font-semibold leading-[13.2px] mb-[12px] text-[#fff] '>{token.grpdate}</div>
                    <div className='grid grid-cols-4'>
                      <div className='w-[91px] '>
                        <Image src={locate} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Group Admin Address</div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                      <div className='w-[91px] '>
                        <Image src={doll} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Collateral Amount</div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                      <div className='w-[107px] '>
                        <Image src={people} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Total <p>No of Members</p></div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpno}</div>
                      </div>
                      <div className='w-[91px] '>
                        <Image src={ticky} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Group <p>State</p></div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                    </div>
                    <div className='mx-auto w-full flex justify-center mt-[14px] mb-[34px] '>
                      <button className='grpbtnn text-[20px] mx-auto font-bold leading-[24px] tracking-[0.1px] text-[#00000] w-[343px] h-[52px] '>View Group</button>
                    </div>
                    </div>
                    <div className='grpcard1 pl-[19px] pt-[12px] pr-[16px] mb-[55px] ml-[35px] '>
                    <div className='flex justify-between mb-[16px] '>
                      <Image src={adv} alt='adv' className='' />
                      <Image src={dot} alt='dot' className='' />
                    </div>
                    <div className='text-[26px] font-extrabold leading-[31.2px] text-[#fff] mb-[6px] '>{token.nameofgrp}</div>
                    <div className='text-[12px] font-semibold leading-[13.2px] mb-[12px] text-[#fff] '>{token.grpdate}</div>
                    <div className='grid grid-cols-4'>
                      <div className='w-[91px] '>
                        <Image src={locate} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Group Admin Address</div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                      <div className='w-[91px] '>
                        <Image src={doll} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Collateral Amount</div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                      <div className='w-[107px] '>
                        <Image src={people} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Total <p>No of Members</p></div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpno}</div>
                      </div>
                      <div className='w-[91px] '>
                        <Image src={ticky} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Group <p>State</p></div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                    </div>
                    <div className='mx-auto w-full flex justify-center mt-[14px] mb-[34px] '>
                      <button className='grpbtnn text-[20px] mx-auto font-bold leading-[24px] tracking-[0.1px] text-[#00000] w-[343px] h-[52px] '>View Group</button>
                    </div>
                    </div>
                    <div className='grpcard1 pl-[19px] pt-[12px] pr-[16px] mb-[55px] '>
                    <div className='flex justify-between mb-[16px] '>
                      <Image src={adv} alt='adv' className='' />
                      <Image src={dot} alt='dot' className='' />
                    </div>
                    <div className='text-[26px] font-extrabold leading-[31.2px] text-[#fff] mb-[6px] '>{token.nameofgrp}</div>
                    <div className='text-[12px] font-semibold leading-[13.2px] mb-[12px] text-[#fff] '>{token.grpdate}</div>
                    <div className='grid grid-cols-4'>
                      <div className='w-[91px] '>
                        <Image src={locate} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Group Admin Address</div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                      <div className='w-[91px] '>
                        <Image src={doll} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Collateral Amount</div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                      <div className='w-[107px] '>
                        <Image src={people} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Total <p>No of Members</p></div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpno}</div>
                      </div>
                      <div className='w-[91px] '>
                        <Image src={ticky} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Group <p>State</p></div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                    </div>
                    <div className='mx-auto w-full flex justify-center mt-[14px] mb-[34px] '>
                      <button className='grpbtnn text-[20px] mx-auto font-bold leading-[24px] tracking-[0.1px] text-[#00000] w-[343px] h-[52px] '>View Group</button>
                    </div>
                    </div>
                    <div className='grpcard1 pl-[19px] pt-[12px] pr-[16px] mb-[55px] ml-[35px] '>
                    <div className='flex justify-between mb-[16px] '>
                      <Image src={adv} alt='adv' className='' />
                      <Image src={dot} alt='dot' className='' />
                    </div>
                    <div className='text-[26px] font-extrabold leading-[31.2px] text-[#fff] mb-[6px] '>{token.nameofgrp}</div>
                    <div className='text-[12px] font-semibold leading-[13.2px] mb-[12px] text-[#fff] '>{token.grpdate}</div>
                    <div className='grid grid-cols-4'>
                      <div className='w-[91px] '>
                        <Image src={locate} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Group Admin Address</div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                      <div className='w-[91px] '>
                        <Image src={doll} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Collateral Amount</div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                      <div className='w-[107px] '>
                        <Image src={people} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Total <p>No of Members</p></div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpno}</div>
                      </div>
                      <div className='w-[91px] '>
                        <Image src={ticky} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Group <p>State</p></div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                    </div>
                    <div className='mx-auto w-full flex justify-center mt-[14px] mb-[34px] '>
                      <button className='grpbtnn text-[20px] mx-auto font-bold leading-[24px] tracking-[0.1px] text-[#00000] w-[343px] h-[52px] '>View Group</button>
                    </div>
                    </div>
                    <div className='grpcard1 pl-[19px] pt-[12px] pr-[16px] mb-[55px] '>
                    <div className='flex justify-between mb-[16px] '>
                      <Image src={adv} alt='adv' className='' />
                      <Image src={dot} alt='dot' className='' />
                    </div>
                    <div className='text-[26px] font-extrabold leading-[31.2px] text-[#fff] mb-[6px] '>{token.nameofgrp}</div>
                    <div className='text-[12px] font-semibold leading-[13.2px] mb-[12px] text-[#fff] '>{token.grpdate}</div>
                    <div className='grid grid-cols-4'>
                      <div className='w-[91px] '>
                        <Image src={locate} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Group Admin Address</div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                      <div className='w-[91px] '>
                        <Image src={doll} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Collateral Amount</div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                      <div className='w-[107px] '>
                        <Image src={people} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Total <p>No of Members</p></div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpno}</div>
                      </div>
                      <div className='w-[91px] '>
                        <Image src={ticky} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Group <p>State</p></div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                    </div>
                    <div className='mx-auto w-full flex justify-center mt-[14px] mb-[34px] '>
                      <button className='grpbtnn text-[20px] mx-auto font-bold leading-[24px] tracking-[0.1px] text-[#00000] w-[343px] h-[52px] '>View Group</button>
                    </div>
                    </div>
                    <div className='grpcard1 pl-[19px] pt-[12px] pr-[16px] mb-[55px] ml-[35px] '>
                    <div className='flex justify-between mb-[16px] '>
                      <Image src={adv} alt='adv' className='' />
                      <Image src={dot} alt='dot' className='' />
                    </div>
                    <div className='text-[26px] font-extrabold leading-[31.2px] text-[#fff] mb-[6px] '>{token.nameofgrp}</div>
                    <div className='text-[12px] font-semibold leading-[13.2px] mb-[12px] text-[#fff] '>{token.grpdate}</div>
                    <div className='grid grid-cols-4'>
                      <div className='w-[91px] '>
                        <Image src={locate} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Group Admin Address</div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                      <div className='w-[91px] '>
                        <Image src={doll} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Collateral Amount</div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                      <div className='w-[107px] '>
                        <Image src={people} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Total <p>No of Members</p></div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpno}</div>
                      </div>
                      <div className='w-[91px] '>
                        <Image src={ticky} alt='png' className='' />
                        <div className='text-[14px] font-bold text-[#fff] mt-[5px] mb-[8px] '>Group <p>State</p></div>
                        <div className='text-[#00FFFF] text-[12px] font-semibold '>{token.grpether}</div>
                      </div>
                    </div>
                    <div className='mx-auto w-full flex justify-center mt-[14px] mb-[34px] '>
                      <button className='grpbtnn text-[20px] mx-auto font-bold leading-[24px] tracking-[0.1px] text-[#00000] w-[343px] h-[52px] '>View Group</button>
                    </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
        ))
    }
    </>
  )
}

export default GroupLists