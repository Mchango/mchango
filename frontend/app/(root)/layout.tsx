import React from 'react';
import StarCanvas from '../components/Stars';

type childrenProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: childrenProps) => {
  return (
    <div className=" relative">
      <div className="absolute -z-999 min-h-screen w-full">
        <StarCanvas />
      </div>
      {children}
    </div>
  );
};

export default Layout;
