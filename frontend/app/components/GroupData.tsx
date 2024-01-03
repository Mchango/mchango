import React from 'react';
import tokensData from '../data.json'
import Image from 'next/image';
import whiteETH from '../assets/whiteETH.svg'

interface Token {
    grpName: string;
    collateral: string;
    percentage: string;
    nextContribt: string;
    membersNo: number;
    dateCreated: string;
    operation: string;
}

const GroupData = () => {

    const tokens: Token[] = tokensData;
    return (
        <>
            {tokens.map((token, index) => (
                <div key={index} className='flex justify-center'>
                    <div className='w-full pt-[18px] '>
                        <div className='ml-[21px]'>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-[12px]">
                                <table className="w-[90%]  text-sm text-left rtl:text-right text-[#FFFFFF]">
                                    <thead className="text-xs uppercase bg-[#345A5A]">
                                        <tr className='text-[13.3px] font-bold text-[#FFFFFF] tracking-[0.4px] '>
                                            <th scope="col" className="px-6 py-[15.7px]">
                                                GROUP NAME
                                            </th>
                                            <th scope="col" className="px-6 py-[15.7px]">
                                                COLLATERAL FEE
                                          </th>
                                            <th scope="col" className="px-6 py-[15.7px]">
                                                NEXT CONTRIBUTION DAY
                                            </th>
                                            <th scope="col" className="px-6 py-[15.7px]">
                                                NO OF MEMBERS
                                            </th>
                                            <th scope="col" className="px-6 py-[15.7px]">
                                                DATE CREATED
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="">
                                            <th scope="row" className="px-6 pt-[30px] pb-4 tracking-[0.15px] text-[#fff] text-[15px] ">
                                                {token.grpName}
                                            </th>
                                            <td className="flex px-6 pt-[30px] pb-4">
                                                <Image src={whiteETH} alt='eth' className='' />
                                                <div className='text-[15px] tracking-[0.15px] text-[#fff] '>{token.collateral}</div>
                                                <div className='text-[15px] tracking-[0.15px] text-[#00FF39] ml-[4px] '>{token.percentage}</div>
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                            {token.nextContribt}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                               {token.membersNo}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                               {token.dateCreated}
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <th scope="row" className="px-6 pt-[30px] pb-4 tracking-[0.15px] text-[#fff] text-[15px] ">
                                            {token.grpName}
                                            </th>
                                            <td className="flex px-6 pt-[30px] pb-4">
                                            <Image src={whiteETH} alt='eth' className='' />
                                            <div className='text-[15px] tracking-[0.15px] text-[#fff] '>{token.collateral}</div>
                                            <div className='text-[15px] tracking-[0.15px] text-[#00FF39] ml-[4px] '>{token.percentage}</div>
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                                {token.nextContribt}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                            {token.membersNo}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                               {token.dateCreated}
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <th scope="row" className="px-6 pt-[30px] pb-4 tracking-[0.15px] text-[#fff] text-[15px] ">
                                                {token.grpName}
                                            </th>
                                            <td className="flex px-6 pt-[30px] pb-4">
                                            <Image src={whiteETH} alt='eth' className='' />
                                            <div className='text-[15px] tracking-[0.15px] text-[#fff] '>{ token.collateral}</div>
                                            <div className='text-[15px] tracking-[0.15px] text-[#00FF39] ml-[4px] '> { token.percentage}</div>
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                            {token.nextContribt}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                            {token.membersNo}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                               {token.dateCreated}
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <th scope="row" className="px-6 pt-[30px] pb-4 tracking-[0.15px] text-[#fff] text-[15px] ">
                                                {token.grpName}
                                            </th>
                                            <td className="flex px-6 pt-[30px] pb-4">
                                            <Image src={whiteETH} alt='eth' className='' />
                                               <div className='text-[15px] tracking-[0.15px] text-[#fff] '>{token.collateral}</div>
                                               <div className='text-[15px] tracking-[0.15px] text-[#00FF39] ml-[4px] '>{token.percentage}</div>
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                            {token.nextContribt}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                            {token.membersNo}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                               {token.dateCreated}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row" className="px-6 pt-[30px] pb-4 tracking-[0.15px] text-[#fff] text-[15px] ">
                                                {token.grpName}
                                            </th>
                                            <td className="flex px-6 pt-[30px] pb-4">
                                            <Image src={whiteETH} alt='eth' className='' />
                                            <div className='text-[15px] tracking-[0.15px] text-[#fff] '>{token.collateral}</div>
                                            <div className='text-[15px] tracking-[0.15px] text-[#00FF39] ml-[4px] '>{token.percentage}</div>
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                            {token.nextContribt}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                            {token.membersNo}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                               {token.dateCreated}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div>

                    </div>

                </div>
            ))}
        </>
    )
}

export default GroupData