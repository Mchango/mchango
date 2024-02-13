import Image from 'next/image';
import Submit_Btn from './Submit_Btn';
import { PhoneCall, Mails, MapPin } from 'lucide-react';
import { socialLinks } from '../data/constants';
import { handleNewsLetterSubscription } from '@/utils/subscription';

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col gap-9 sm:gap-10 lg:flex-row lg:gap-[300px] bg-gray-950/40 py-5 px-9 pb-5 backdrop-blur-md w-full items-center  ">
      <div className="flex flex-col gap-5 lg:pt-7 justify-center items-center w-[fit-content]">
        <h3 className=" capitalize text-center text-white font-lexend font-bold text-[16px] sm:text-[18px] lg:text-[24px]">
          Join our web3 savings community
        </h3>
        <p className="text-gray-300 text-center font-medium font-work text-[14px] sm:text-[16px] ">
          Subscribe to our newsletter and become part of our thriving web3
          savings group. Stay informed, save smarter,{' '}
          <br className="hidden lg:flex" /> and grow your financial future with
          us!
        </p>

        <form
          action={async (FormData) => {
            await handleNewsLetterSubscription(FormData);
          }}
          className="flex flex-row justify-between border relative rounded-[20px] px-2 py-2 w-auto sm:max-w-[650px]  mt-3  md:gap-[230px] items-center"
        >
          <input
            type="email"
            name="mail"
            required
            placeholder="@mchango.com"
            className="bg-transparent placeholder:text-gray-300 text-white font-Azeret max-sm:text-[13px] md:text-[15px] lg:text-[17px] outline-none border-none"
          />
          <div>
            <Submit_Btn />
          </div>
        </form>
        <div className="hidden lg:flex items-center gap-5">
          <Image
            src="/Logo.svg"
            alt="Mchango_"
            width={30}
            height={30}
            className="sm:w-[70px] sm:h-[70px]"
          />

          <p className="text-[18px] font-lexend font-semibold text-white">
            Mchango _
          </p>
        </div>
      </div>

      {/**Tab size contact and social section */}
      <section className=" hidden sm:flex lg:hidden flex-row justify-center items-center gap-[100px] ">
        <div className="flex flex-col gap-5 justify-center self-start  items-center w-[fit-content]">
          <h3 className=" capitalize text-center text-white font-lexend font-bold text-[16px] sm:text-[18px] lg:text-[24px]">
            contact information
          </h3>

          <div className=" flex-col items-center gap-5">
            <div className="flex flex-row items-center gap-3">
              <PhoneCall size={20} color="white" />
              <p className="text-gray-200 font-work font-medium text-[14px] sm:text-[16px]">
                09122145480
              </p>
            </div>

            <div className="flex flex-row items-center gap-3 mt-5">
              <Mails size={20} color="white" />
              <p className="text-gray-200 font-work font-medium text-[14px] sm:text-[16px]">
                mchango@gmail.com
              </p>
            </div>

            <div className="flex flex-row items-center gap-3 mt-5">
              <MapPin size={20} color="white" />
              <p className="text-gray-200 font-work font-medium text-[14px] sm:text-[16px]">
                United States of America
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 justify-center self-start  items-center w-[fit-content]">
          <h3 className=" capitalize text-center text-white font-lexend font-bold text-[16px] sm:text-[18px] lg:text-[24px]">
            Socials
          </h3>

          <div className="flex flex-col text-white gap-5 items-center">
            {socialLinks.map((link) => (
              <div key={link.id} className="flex flex-col gap-5 items-center">
                <a
                  href={link.href}
                  className="flex flex-row items-center gap-3 hover:scale-100 active:scale-95 transition-all duration-200"
                >
                  {link.icon}
                  <p className="text-gray-200 font-work font-medium text-[14px] sm:text-[16px]">
                    {link.name}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/**Contact Section */}
      <div className="flex flex-col gap-5 justify-center self-start sm:hidden lg:flex lg:-mt-[80px] lg:self-center items-center w-[fit-content]">
        <h3 className=" capitalize text-center text-white font-lexend font-bold text-[16px] sm:text-[18px] lg:text-[24px]">
          contact information
        </h3>

        <div className=" flex-col items-center gap-5">
          <div className="flex flex-row items-center gap-3">
            <PhoneCall size={20} color="white" />
            <p className="text-gray-200 font-work font-medium text-[14px] sm:text-[16px]">
              09122145480
            </p>
          </div>

          <div className="flex flex-row items-center gap-3 mt-5">
            <Mails size={20} color="white" />
            <p className="text-gray-200 font-work font-medium text-[14px] sm:text-[16px]">
              mchango@gmail.com
            </p>
          </div>

          <div className="flex flex-row items-center gap-3 mt-5">
            <MapPin size={20} color="white" />
            <p className="text-gray-200 font-work font-medium text-[14px] sm:text-[16px]">
              United States of America
            </p>
          </div>
        </div>
      </div>

      {/**Social Section */}
      <div className="flex flex-col gap-5 justify-center self-start sm:hidden lg:flex lg:-mt-[40px] lg:self-center items-center w-[fit-content]">
        <h3 className=" capitalize text-center text-white font-lexend font-bold text-[16px] sm:text-[18px] lg:text-[24px]">
          Socials
        </h3>

        <div className="flex flex-col text-white gap-5 items-center">
          {socialLinks.map((link) => (
            <div key={link.id} className="flex flex-col gap-5 items-center">
              <a
                href={link.href}
                className="flex flex-row items-center gap-3 hover:scale-100 active:scale-95 transition-all duration-200"
              >
                {link.icon}
                <p className="text-gray-200 font-work font-medium text-[14px] sm:text-[16px]">
                  {link.name}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="flex lg:hidden items-center gap-5">
        <Image
          src="/Logo.svg"
          alt="Mchango_"
          width={30}
          height={30}
          className="sm:w-[70px] sm:h-[70px]"
        />

        <p className="text-[18px] font-lexend font-semibold text-white">
          Mchango _
        </p>
      </div>
    </footer>
  );
};

export default Footer;
