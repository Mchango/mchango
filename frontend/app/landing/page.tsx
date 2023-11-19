
import GatewayLanding from '../components/GatewayLanding';
import Navbar from '../components/Navbar';

const Landing = () => {
  return (
    <>
   <div className='flex justify-center'>
    <div className='w-full '>
      <div className='h-screen w-full bg-[url("https://res.cloudinary.com/dmye53wps/image/upload/v1699652923/mchango_m0fuc7.svg")] bg-cover bg-center '>
        <div className='lg:max-w-7xl w-full mx-auto'>
        <Navbar />
        <GatewayLanding />
        </div>
      </div>

    </div>
   </div>
    </>

  )
}

export default Landing
