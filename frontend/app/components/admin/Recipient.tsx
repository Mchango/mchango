import { recipientData } from "@/app/data/recipient-data";
import { ArrowBigRight, ArrowRight } from "lucide-react";
import React from "react";
import { div } from "three/examples/jsm/nodes/Nodes.js";

export default function Recipient() {
  return (
    <div className="w-full">
      <h3 className="text-[#00FFFF] text-2xl">Recipient List</h3>
      <Recipient.List />
    </div>
  );
}

Recipient.Data = recipientData;

Recipient.List = () => {
  return (
    <section className="w-full text-sm">
      <div className="flex uppercase justify-between px-5 py-2 mt-5 rounded-lg bg-[#345A5A] text-white">
        <span className="w-[40%]">Recipient Name</span>
        <span className="w-[40%]">Next Receiving Day</span>
        <span className="w-[20%]">Amount</span>
      </div>
      {Recipient.Data.map((item, i) => (
        <div
          key={i}
          className="flex justify-between px-5 py-3 text-white/50"
        >
          <span className="w-[40%]">{item.name}</span>
          <span className="w-[40%]">{item.next_receiving_day}</span>
          <span className="w-[20%]">{item.amount}</span>
        </div>
      ))}
      <Recipient.Card />
      <Recipient.Button />
    </section>
  );
};

Recipient.Card = () => {
  return (
    <article className="bg-[#D1B9FF] rounded-lg mt-5 shadow py-3 px-5 flex items-center gap-x-3">
      <div className="w-16 h-16 rounded-full bg-[#A87BFF] p-2 shadow flex flex-col gap-1 items-center justify-center text-xs">
        <span className="border border-black/90 w-[24px]"></span>
        <div className="flex flex-col items-center">
          <span className="border border-black/90 w-[24px]"></span>
          <span className="text-xs tracking-tighter">
            123<b className="font-semibold">-</b>
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-medium">500</h3>
        <p>Participant/Receive Count</p>
      </div>
    </article>
  );
};

Recipient.Button = () => {
    return (
        <button className="w-full flex gap-x-2 items-center justify-center text-white/90 text-2xl mt-5 border-2 border-[#A87BFF] p-3 rounded-lg">
            <span>Adjust Contribution Plan</span>
            <ArrowRight />
        </button>
    )
}
