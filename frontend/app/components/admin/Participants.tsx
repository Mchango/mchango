import {Search } from "lucide-react";
import React from "react";
import ParticipantList from "./ParticipantList";

export default function Participants() {
  return (
    <div className="w-full">
      <h3 className="text-[#00FFFF] text-2xl">Participant List</h3>
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


Participants.List = ParticipantList
