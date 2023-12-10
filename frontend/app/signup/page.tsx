import Image from 'next/image'
import React from 'react';
import line from '../assets/line.svg';
import logoo from '../assets/logoo.svg'
import SignupForm from '../components/SignupForm';

const SignUp = () => {
  return (
    <>
      <div className='flex justify-center'>
        <div className='w-full '>
          <div className='h-full w-full bg-[url("https://res.cloudinary.com/dmye53wps/image/upload/v1699652923/mchango_m0fuc7.svg")] bg-cover bg-center '>
            <div className='lg:max-w-7xl w-full mx-auto'>
              <div className='mb-[90px]'>
                <div className='text-[40px] text-[#FFF] font-semibold leading-normal'>Mchango_</div>
                <Image src={line} alt='line' className='mx-auto w-full' />
              </div>
              <div className='flex justify-center w-full'>
                <div>
                <div className='flex justify-center mb-[21px]'>
                  <Image src={logoo} alt='logo' className='' />
                  <div className='text-[52px] font-bold text-[#FFFFFF] ml-[15px] my-auto '>Mchango_</div>
                </div>
                <div className='signupgate text-[40px] font-bold mb-[21px] '>Gateway to Smart Savings and Contributions</div>
                <SignupForm />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default SignUp;
