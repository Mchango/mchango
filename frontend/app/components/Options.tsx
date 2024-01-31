"use client";
import React, { useState } from "react";
import SmallDot from "../svgComponents/smallDot";

export default function Options() {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  return (
    <div className="relative  w-full">
      <div className=" relative cursor-pointer" onClick={handleOptions}>
        <SmallDot />
        <SmallDot />
        <SmallDot />
        {isOptionsOpen ? (
          <div className="flex flex-col  gap-1 absolute w-[150px]">
            <div className="px-[4px] py-[5px] bg-redBtn rounded-[2px] items-center">
              <h2>Remove member</h2>
            </div>
            <div className="px-[4px] py-[5px] bg-purpleSmallDeep rounded-[2px] items-center">
              <h2>Message member</h2>
            </div>
          </div>
        ) : (
          <div className="hidden flex-col  gap-1 absolute w-[150px]">
            <div className="px-[4px] py-[5px] bg-redBtn rounded-[2px] items-center">
              <h2>Remove member</h2>
            </div>
            <div className="px-[4px] py-[5px] bg-purpleSmallDeep rounded-[2px] items-center">
              <h2>Message member</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
