import React from "react";
import CountSvg from "../svgComponents/countSvg";
import data from "../data.json";

interface countToken {
  groupCount: string;
}
export default function CountTag() {
  const tokens: countToken[] = data;
  return (
    <div className="flex p-[28px] items-center gap-[24px] bg-purpleTag rounded-[15px]">
      <div className="flex p-[11px] justify-center items-center rounded-[50px] bg-purpleSmallDeep">
        <CountSvg />
      </div>
      <div>
        {tokens.map((token) => (
          <h2 className="text-black  font-poppins text-4xl font-medium">
            {token.groupCount}
          </h2>
        ))}
        <p className="text-black font-poppins text-xl font-medium">
          Participant/Receive Count
        </p>
      </div>
    </div>
  );
}
