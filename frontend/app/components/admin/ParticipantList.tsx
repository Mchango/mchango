"use client";
import React from "react";
import { participantsData } from "@/app/data/participant-data";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import Image from "next/image";
import userLogo from "../../assets/user-octagon.svg";

export default function ParticipantList() {
  return (
    <section className="w-full mt-5 text-white/50 text-sm">
      <div
        id="list header"
        className="flex gap-x-5 justify-between border-b border-white/50 py-2 px-4"
      >
        <span className="w-1/5">
          <Image
            src={userLogo}
            width={20}
            height={20}
            alt="user logo"
            className="w-auto h-auto"
          />
        </span>
        <span className="w-3/5">Name</span>
        <span className="w-3/5">Date Joined</span>
        <span className="hidden lg:flex w-[5%]"></span>
      </div>
      {ParticipantList.Data.map((item) => (
        <div
          id="list-items"
          className="relative w-full flex justify-between gap-x-5 flex-nowrap border-b border-white/50 py-2 px-4"
          key={item.id}
        >
          <span className="w-10 h-auto rounded-full bg-[#EAEEF4] mr-5" />
          <span className="w-full lg:w-3/5">{item.name}</span>
          <span className="w-full lg:w-3/5">{item.date_joined}</span>
          <ParticipantList.More />
        </div>
      ))}

      <div className="flex item-center justify-center gap-2 my-5">
        <span>1-10 of 315</span>
        <span className="text-white flex gap-2">
          <ChevronLeft size={16} /> <ChevronRight size={16} />
        </span>
      </div>
    </section>
  );
}

ParticipantList.Data = participantsData;

ParticipantList.More = () => {
  const [open, setOpen] = React.useState(false);
  function toggle() {
    setOpen(!open);
  }
  return (
    <span className="hidden lg:block w-[5%] text-right relative">
      <MoreVertical onClick={toggle} className="cursor-pointer" />
      {open && <ParticipantList.Options />}
    </span>
  );
};

ParticipantList.Options = () => {
  return (
    <div className="w-40 p-3 absolute top-4 -right-7 flex flex-col">
      <button className="bg-[#FA0909] text-white/90 py-2 z-10 rounded">
        Remove Member
      </button>
      <button className="bg-[#A87BFF] text-white/90 py-2 z-10 rounded">
        Message Member
      </button>
    </div>
  );
};
