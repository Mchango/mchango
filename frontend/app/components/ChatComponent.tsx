import React from 'react'
import ChatMessages from './ChatMessages'
import GroupChat from './GroupChat'

const ChatComponent = () => {
  return (
    <>
    <div className='flex justify-center ' >
        <div className='w-full ml-[17px] mt-[32px]'>
            <div className='flex '>
                <div>
                    <ChatMessages />
                </div>
                <div className='w-[1px] h-[893px] bg-[#FFFFFF] mx-[30px] '></div>
                <GroupChat />
            </div>

        </div>

    </div>
    </>
  )
}

export default ChatComponent