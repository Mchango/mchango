import React from 'react';
import tokensData from '../data.json'

interface Token {
    id: string;
    block: string;
    membersNo: number;
    dateTime: string;
    operation: string;
}

const GroupEvents = () => {
    const tokens: Token[] = tokensData;

    return (
        <>
            {tokens.map((token, index) => (
                <div key={index} className='flex justify-center '>
                    <div className='w-full mt-[34px] '>
                        <div className='ml-[21px]'>
                            <div className='text-[32px] font-bold leading-[48px] text-[#fff] ml-[16px] '>Group Events</div>
                            <div className='text-[#00F0FF] text-[14px] font-bold leading-[21px] ml-[16px] mb-[30px] '>Here you will find latest events from active groups.</div>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-[12px]">
                                <table className="w-[90%]  text-sm text-left rtl:text-right text-[#FFFFFF]">
                                    <thead className="text-xs uppercase ">
                                        <tr className='text-[13.3px] font-bold text-[#FFFFFF] tracking-[0.4px] bg-[#345A5A] '>
                                            <th scope="col" className="px-6 py-[15.7px]">
                                                Operation
                                            </th>
                                            <th scope="col" className="px-6 py-[15.7px]">
                                                ID
                                            </th>
                                            <th scope="col" className="px-6 py-[15.7px]">
                                                DATE AND TIME
                                            </th>
                                            <th scope="col" className="px-6 py-[15.7px]">
                                                BLOCK
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row" className="px-6 pt-[30px] pb-4 tracking-[0.15px] text-[#fff] text-[15px] ">
                                                {token.operation}
                                            </th>
                                            <td className="flex px-6 pt-[30px] pb-4">
                                                {token.id}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                                {token.dateTime}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                                {token.block}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row" className="px-6 pt-[30px] pb-4 tracking-[0.15px] text-[#fff] text-[15px] ">
                                                {token.operation}
                                            </th>
                                            <td className="flex px-6 pt-[30px] pb-4">
                                                {token.id}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                                {token.dateTime}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                                {token.membersNo}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row" className="px-6 pt-[30px] pb-4 tracking-[0.15px] text-[#fff] text-[15px] ">
                                                {token.operation}
                                            </th>
                                            <td className="flex px-6 pt-[30px] pb-4">
                                                {token.id}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                                {token.dateTime}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                                {token.membersNo}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row" className="px-6 pt-[30px] pb-4 tracking-[0.15px] text-[#fff] text-[15px] ">
                                                {token.operation}
                                            </th>
                                            <td className="flex px-6 pt-[30px] pb-4">
                                                {token.id}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                                {token.dateTime}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                                {token.membersNo}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row" className="px-6 pt-[30px] pb-4 tracking-[0.15px] text-[#fff] text-[15px] ">
                                                {token.operation}
                                            </th>
                                            <td className="flex px-6 pt-[30px] pb-4">
                                                {token.id}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                                {token.dateTime}
                                            </td>
                                            <td className="px-6 pt-[30px] pb-4">
                                                {token.membersNo}
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

export default GroupEvents