import React from "react";
import Image from "next/image";
import Link from "next/link";
import mchlogo from "../../assets/mchlogo.svg";
import home from "../../assets/home.svg";
import chat from "../../assets/chat.svg";
import group from "../../assets/group.svg";
import upgrade from "../../assets/upgrade.svg";
import profile from "../../assets/profile.svg";
import rocket from "../../assets/rocket.svg";
import MainComponent from "./MainComponent";

export default function AdminComponent() {
  return (
    <section className="flex">
      <AdminComponent.SideBar />
      <MainComponent />
    </section>
  );
}

AdminComponent.SideBar = () => {
  return (
    <aside className="hidden lg:block w-[280px] bg-[#011717] border-r border-[#477A7A]/60 h-fit rounded-md p-4 space-y-10">
      <div className="flex gap-2 mt-5">
        <Image
          src={mchlogo}
          width={36}
          height={36}
          alt="mchlogo logo"
          className=""
        />
        <h2 className="text-[#EFEFEF] text-2xl font-semibold">Mchango_</h2>
      </div>

      <menu className="flex flex-col space-y-10">
        {AdminComponent.menus.map((item, i) => (
          <Link href={item.url} key={i}>
            <li key={item.id} className="text-[#EFEFEF] text-xl flex gap-x-5">
              <Image
                src={item.icon}
                width={28}
                height={28}
                alt={`${item.name} Icon`}
                className="w-auto h-auto"
              />
              {item.name}
            </li>
          </Link>
        ))}
      </menu>
      <div className="relative z-20 flex items-center justify-center w-full pb-[10rem]">
        <Image
          src={rocket}
          width={200}
          height={200}
          alt={`Rocket Icon`}
          className="w-auto h-auto"
        />
        <article className="flex flex-col gap-1 items-center justify-end mt-5 absolute top-20 -z-10 bg-gradient-to-l from-[#0A6B80] to-[#2F2180] w-full min-h-[203px] rounded-2xl border-[#E2DEF9]">
            <p className="text-white text-xs font-medium text-center p-2">Want to upgrade to pro to get more exciting features?</p>
            <button className="bg-black hover:bg-black/50 text-xs text-white rounded-full px-5 py-2 mb-5">Upgrade now</button>
        </article>
      </div>
    </aside>
  );
};

AdminComponent.menus = [
  { id: 1, name: "Home", url: "/", icon: home },
  { id: 2, name: "Chat", url: "/chats", icon: chat },
  { id: 3, name: "Groups", url: "/groups", icon: group },
  { id: 4, name: "Upgrade", url: "/#upgrade", icon: upgrade },
  { id: 5, name: "Profile", url: "/profile", icon: profile },
];
