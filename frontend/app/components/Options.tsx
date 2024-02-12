import React, { useState } from "react";
import SmallDot from "../svgComponents/smallDot";
import IconDetails from "./iconDetails";

export default function Options() {
  return (
    <div className="relative w-full">
      <div className="relative cursor-pointer">
        <SmallDot />
        <SmallDot />
        <SmallDot />
      </div>
    </div>
  );
}
