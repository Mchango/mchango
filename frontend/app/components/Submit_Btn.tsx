import React from 'react';
import { useFormStatus } from 'react-dom';
import { Lock } from 'lucide-react';
import { Send } from 'lucide-react';

const Submit_Btn = () => {
  const { pending } = useFormStatus();
  return (
    <button className="bg-white border-2  group hover:bg-[#008080]  hover:scale-110 active:scale-105 transition-all duration-200 rounded-[15px] shadow-md p-2 items-center  w-[fit-content]">
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-[#008080]"></div>
      ) : (
        <div className="flex items-center gap-[2]">
          <span className="font-Azeret font-semibold text-[12px] text-gray-950 group-hover:text-white sm:text-[16px]">
            Subscribe
          </span>
        </div>
      )}
    </button>
  );
};
export default Submit_Btn;
