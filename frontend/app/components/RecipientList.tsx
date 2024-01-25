import React from "react";
import whiteETH from "../assets/whiteETH.svg";
import Image from "next/image";
import tokensData from "../customerData.json";
import CountTag from "./CountTag";
import ContributeWeek from "./ContributeWeek";

interface Token {
  recipientName: string;
  recipientRecievinngDay: string;
  recipientAmount: string;
}
export default function RecipientList() {
  const tokens: Token[] = tokensData;

  return (
    <>
      <div className="w-full flex flex-col gap-[23px]">
        <p className="text-sky font-nunito text-2xl font-bold not-italic">
          Recipients list
        </p>
        <div>
          <table className="w-full text-sm text-left rtl:text-right text-[#FFFFFF]">
            <thead className="text-xs uppercase w-full  ">
              <tr className="text-base font-bold text-[#FFFFFF] tracking-[0.4px] bg-[#345A5A] rounded-xl ">
                <th scope="col" className="py-[15.7px] pl-[12px] rounded-s-xl">
                  RECIPIENT NAME
                </th>
                <th scope="col" className=" py-[15.7px]">
                  NEXT RECEIVING DAY
                </th>
                <th scope="col" className=" py-[15.7px] rounded-e-xl">
                  AMOUNT
                </th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, index) => (
                <tr className="" key={index}>
                  <th
                    scope="row"
                    className=" pt-[30px] pb-4 tracking-[0.15px] text-[#fff] text-[15px] pl-[12px]"
                  >
                    {token.recipientName}
                  </th>

                  <td className=" pt-[30px] pb-4">
                    {token.recipientRecievinngDay}
                  </td>

                  <td className="flex  pt-[30px] pb-4">
                    <Image src={whiteETH} alt="eth" className="" />
                    <div className="text-[15px] tracking-[0.15px] text-[#fff] ">
                      {token.recipientAmount} ETH
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <CountTag />
          <ContributeWeek />
        </div>
      </div>
    </>
  );
}
