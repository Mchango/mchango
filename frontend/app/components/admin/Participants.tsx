import { participantsData } from "@/app/data/participant-data";
import {
  Anchor,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Search,
} from "lucide-react";
import userLogo from "../../assets/user-octagon.svg";
import React from "react";
import Image from "next/image";

export default function Participants() {
  return (
    <div className="w-full">
      <h3 className="text-[#00FFFF] text-lg">Participant List</h3>
      <Participants.SearhBox />
      <Participants.List />
    </div>
  );
}

Participants.SearhBox = () => {
  return (
    <div className="flex relative mt-5 ">
      <Search className="text-white/50 absolute top-2 left-5" />
      <input
        type="search"
        className="py-2 px-5 placeholder:pl-5 pl-14 text-white/50 rounded-full border border-white/50 bg-transparent after:contents"
      />
    </div>
  );
};

Participants.Data = participantsData;

Participants.List = () => {
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
        <span className="w-[5%]"></span>
      </div>
      {Participants.Data.map((item) => (
        <div
          id="list-items"
          className="w-full flex justify-between gap-x-5 flex-nowrap border-b border-white/50 py-2 px-4"
          key={item.id}
        >
          <span className="w-1/5">Avatar</span>
          <span className="w-3/5">{item.name}</span>
          <span className="w-3/5">{item.date_joined}</span>
          <span className="w-[5%] text-right">
            <MoreVertical />
          </span>
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
};
