import React from 'react'
import SideNav from '../components/SideNav'
import HomeNav from '../components/HomeNav'

const Home = () => {
    return (
        <>
            <div className='bg-[#021D1D] flex justify-center '>
                <div className='w-full lg:max-w-[1400px]'>
                    <div className='flex'>
                        <SideNav />
                        <div className='w-full'>
                            <HomeNav />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home