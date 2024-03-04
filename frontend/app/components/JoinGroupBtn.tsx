import React from "react";
import MainArrorwBlackSvg from "../svgComponents/mainArrorwBlackSvg";

export default function JoinGroupBtn() {
  return (
    <div className="w-[304px] p-[28px] items-center justify-center gap-[12px] bg-deepGreen flex my-0 mx-auto  rounded-2xl cursor-pointer">
      <p className="text-black font-poppins font-normal not-italic text-2xl">
        Join Group
      </p>
      <MainArrorwBlackSvg />
    </div>
  );
}
