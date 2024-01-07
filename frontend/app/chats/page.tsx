import React from 'react'
import SideNav from '../components/SideNav'
import ChatComponent from '../components/ChatComponent'

const Chats = () => {
  return (
   <>
   <div className='bg-[#021D1D] flex justify-center '>
    <div className='w-full lg:max-w-[1400px]'>
        <div className='flex'>
            <SideNav />
            <ChatComponent />

        </div>
    </div>

   </div>
   </>
  )
}

export default Chats