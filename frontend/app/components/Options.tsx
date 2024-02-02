"use client";
import React, { useState } from "react";
import SmallDot from "../svgComponents/smallDot";

export default function Options() {
  // const [popIndex, setPopIndex] = useState(null);

  return (
    <div className="relative  w-full">
      <div className=" relative cursor-pointer">
        <SmallDot />
        <SmallDot />
        <SmallDot />
      </div>
    </div>
  );
}
