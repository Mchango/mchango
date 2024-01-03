// components/NotificationBell.tsx

import Image from 'next/image';
import React from 'react';
import bell from '../assets/bell.svg'

interface NotificationBellProps {
  notificationCount: number;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ notificationCount }) => {
  return (
    <div className="relative inline-block w-[60px] h-[60px] flex justify-center items-center rounded-[50%] border-[1px] border-[#008080] ">
      <div className="rounded-full ">
        <Image src={bell} alt='bell' className='' />
      </div>
      {notificationCount > 0 && (
        <div className="absolute -top-[9px] right-0 bg-[#fd0d00] opacity-[0.6] text-white rounded-[50%] px-2 py-[2px] text-[13px]">
          {notificationCount}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
