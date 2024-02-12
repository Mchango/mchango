'use client';

import React, { useState, useEffect } from 'react';
import GatewayLanding from '../components/GatewayLanding';
import MasteryHub from '../components/MasteryHub';
import MobileNav from '../components/MobileNav';
import Navbar from '../components/Navbar';
import Plan from '../components/Plan';
import SmartCrypto from '../components/SmartCrypto';
import MetamaskPrompt from '../components/MetamaskPrompt';

const Landing = () => {
  const [metamaskInstalled, setMetamaskInstalled] = useState(true);
  useEffect(() => {
    if (typeof window.ethereum === 'undefined') {
      setMetamaskInstalled(false);
    }
  }, []);
  return !metamaskInstalled ? (
    <MetamaskPrompt />
  ) : (
    <>
      <div className="flex justify-center overflow-x-hidden">
        <div className="w-full ">
          <div className='h-full w-full bg-[url("https://res.cloudinary.com/dmye53wps/image/upload/v1699652923/mchango_m0fuc7.svg")] bg-cover bg-center relative  '>
            <div className=" absolute bg-grid-white/[0.1] h-full w-full"></div>
            <div className="lg:max-w-7xl w-full mx-auto z-50 relative">
              <div className="absolute top-[80px] left-[170px] z-50 ">
                <MobileNav />
              </div>
              <Navbar />
              <GatewayLanding />
              <SmartCrypto />
              <MasteryHub />
              <Plan />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
