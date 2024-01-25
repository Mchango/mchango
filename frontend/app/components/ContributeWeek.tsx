import React from "react";
import RightArrowSvg from "../svgComponents/rightArrowSvg";
import MainArrow from "../svgComponents/mainArrow";

export default function ContributeWeek() {
  return (
    <div className="flex p-[28px] justify-center items-center gap-[12px]">
      <p className="text-offWhite font-poppins text-xl font-medium not-italic">
        Contribute for the week
      </p>
      <div className="cursor-pointer">
        <MainArrow />
      </div>
    </div>
  );
}
