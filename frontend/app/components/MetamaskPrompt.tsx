'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MetamaskPrompt() {
  return (
    <div className="h-screen w-screen flex flex-row justify-center p-8 items-start bg-signUp">
      <div className=" p-4 flex flex-col gap-4 justify-center items-center rounded pb-8 font-Inconsolata bg-white/30">
        <h1 className="text-2xl font-semibold text-center">
          Oops!! Ethereum provider wasn't detected
        </h1>
        <span className="text-center">
          An Ethereum provider e.g Metamask, wasn't detected. <br /> click
          'install' to download
        </span>
        <Link
          className="px-4 py-2 rounded bg-primary-300 ring-2"
          href={
            'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
          }
        >
          Install
        </Link>
      </div>
    </div>
  );
}


