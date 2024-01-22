import React from "react";
import Image from "next/image";
import data from "../data.json";
import Profile from "../assets/Ellipse 756.png";
import IconDetails from "./iconDetails";

interface Token {
  grpName: string;
  dateCreated: string;
}
export default function GroupNameLogo() {
  const tokens: Token[] = data;
  return (
    <>
      <div className="bg-gradient-to-r from-teal from-0% to-purple to-84.01% py-[50px] mt-[41px] rounded-lg">
        {tokens.map((token, index) => (
          <div
            key={index}
            className=" flex gap-4  justify-center items-center mx-auto my-0"
          >
            <div className="w-[200px] h-[200px] ml-[40px]">
              <Image src={Profile} alt="png" className="" />
            </div>
            <div className="flex flex-col items-start gap-5 w-[80%]">
              <div className="flex  flex-col items-start  gap-3">
                <h1 className="text-white font-[Poppins] text-4xl font-black not-italic leading-[120%]">
                  {token.grpName} Group
                </h1>
                <p className="text-white font-[Poppins] text-[16px] font-semibold not-italic leading-[120%] opacity-60">
                  {token.dateCreated}
                </p>
              </div>
              <div className="flex justify-center py-[2px] px-[0px] items-center gap-[82px]">
                {IconDetails().link.map((item, index) => (
                  <div key={index}>
                    <div className="bg-white w-[40px] h-[40px] flex justify-center items-center rounded-lg">
                      {item.icon}
                    </div>
                    <h1 className="text-white font-[Nunito] text-[20px] font-semibold not-italic leading-normal">
                      {item.name}
                    </h1>
                    <span className="text-sky font-poppins text-[12px] font-normal not-italic leading-normal">
                      {item.amount} Ethers
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
