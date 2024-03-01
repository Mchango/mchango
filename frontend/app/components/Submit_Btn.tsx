"use client"

import React from 'react';
import { useFormStatus } from 'react-dom';

type ButtonProps = {
  backgroundColor: string;
  name: string;
  padding?: string;
  fontColor?: string;
  fontSize?: string;
};

const Submit_Btn = ({
  backgroundColor,
  name,
  padding,
  fontColor,
  fontSize,
}: ButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`${backgroundColor} border-2  group hover:bg-[#008080]  hover:scale-110 active:scale-105 transition-all duration-200 rounded-[15px] shadow-md ${
        padding ? padding : 'p-2'
      } items-center  w-[fit-content]`}
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-[#008080]"></div>
      ) : (
        <div className="flex items-center gap-[2]">
          <span
            className={`font-Azeret font-semibold ${
              fontSize ? fontSize : 'text-[12px] sm:text-[16px]'
            } ${
              fontColor ? fontColor : 'text-gray-950'
            } group-hover:text-white `}
          >
            {name}
          </span>
        </div>
      )}
    </button>
  );
};
export default Submit_Btn;
