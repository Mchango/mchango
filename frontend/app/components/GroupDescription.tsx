import React from "react";
import data from "../groupData.json";
import BulletPointSvg from "../svgComponents/bulletPointSvg";
import MainArrorwBlackSvg from "../svgComponents/mainArrorwBlackSvg";
import JoinGroupBtn from "./JoinGroupBtn";

interface groupTokens {
  grpDescription: string;
  why: {
    ans1: string;
    ans2: string;
    ans3: string;
    ans4: string;
  };
}
export default function GroupDescription() {
  const tokens: groupTokens[] = data;
  return (
    <div className="w-[130%]">
      <h1 className="text-sky font-nunito not-italic text-3xl font-bold">
        Group Description
      </h1>
      <div className="flex flex-col  gap-[64px]">
        <p className="text-white font-nunito text-xl not-italic font-[300] leading-10">
          Welcome to DelwareSavers, a community of forward-thinking individuals
          committed to improving our financial future jointly through bitcoin
          savings and investment. Our goal is straightforward: to pool our
          resources, contribute on a regular basis, and watch our savings grow
          as we explore the exciting world of cryptocurrencies.
        </p>
        <div className="flex flex-col gap-5">
          <p className="text-white font-nunito text-xl not-italic font-[300] leading-8 ">
            Why Should You Join DelwareSavers?
          </p>
          {tokens.map((token) => (
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-center ">
                <BulletPointSvg />
                <p className="text-white font-nunito text-xl not-italic font-[300] leading-8">
                  {token.why.ans1}
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <BulletPointSvg />
                <p className="text-white font-nunito text-xl not-italic font-[300] leading-8">
                  {token.why.ans2}
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <BulletPointSvg />
                <p className="text-white font-nunito text-xl not-italic font-[300] leading-8">
                  {token.why.ans3}
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <BulletPointSvg />
                <p className="text-white font-nunito text-xl not-italic font-[300] leading-8">
                  {token.why.ans4}
                </p>
              </div>
            </div>
          ))}
        </div>
        <JoinGroupBtn />
      </div>
    </div>
  );
}
