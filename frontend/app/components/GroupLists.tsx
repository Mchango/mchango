import React from 'react'
import tokensData from '../data.json' 

interface Token {
    nameofgrp: string;
    grpdate: string;
    grpether: number;
    dateTime: string;
    operation: string;
} 

const GroupLists = () => {

    const tokens: Token[] = tokensData;
  return (
    <>
    {
        tokens.map((token, index) => (
            <div key={index} className='flex justify-center '>

            </div>
        ))
    }
    </>
  )
}

export default GroupLists