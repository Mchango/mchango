import React from 'react';
import SideNav from '../components/SideNav';
import CreateGroup from '../components/CreateGroup';

const CreateGrp = () => {
  return (
    <>
      <div className="bg-[#021D1D] flex justify-center ">
        <div className="w-full lg:max-w-[1400px]">
          <div className="flex">
            <SideNav />
            <CreateGroup />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateGrp;
