import GatewayLanding from '../components/GatewayLanding';
import MasteryHub from '../components/MasteryHub';
import Navbar from '../components/Navbar';
import Plan from '../components/Plan';
import SmartCrypto from '../components/SmartCrypto';

/**
 * todo: work on the responsivnes of the landing page
 * todo: mobile view has been added to the figma file
 */

const Landing = () => {
  return (
    <>
      <div className="flex justify-center overflow-x-hidden">
        <div className="w-full ">
          <div className='h-full w-full bg-[url("https://res.cloudinary.com/dmye53wps/image/upload/v1699652923/mchango_m0fuc7.svg")] bg-cover bg-center relative  '>
            <div className=" absolute bg-grid-white/[0.1] h-full w-full"></div>
            <div className="lg:max-w-7xl w-full mx-auto z-50 relative">
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
