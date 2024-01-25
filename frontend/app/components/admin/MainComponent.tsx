import React from "react";
import Image from "next/image";
import coin from "../../assets/coin.png";
import checked from "../../assets/checked.svg";
import groupedUser from "../../assets/user-group.svg";
import dollar from "../../assets/dollar-sign.svg";
import edit from "../../assets/edit_location.svg";
import Participants from "./Participants";
import Recipient from "./Recipient";
import GroupEventComponent from "./GroupEventComponent";

export default function MainComponent() {
  return (
    <div className="px-12 py-10 w-full">
      <section className="bg-gradient-to-r from-[#0A6B80] from-10% to-[#2F2180] to-90% min-h-[203px] rounded-2xl border-[#E2DEF9] p-10 w-full">
        <div className="flex gap-x-5 items-center justify-start">
          <Image
            src={coin}
            width={224}
            height={230}
            alt="advert image"
            className="w-[200px] h-[200px] hidden lg:flex"
          />
          <article>
            <div>
              <h2 className="text-2xl text-white font-semibold">
                Adventure Funds Group
              </h2>
              <span className="text-white/50">created on 20 July</span>
            </div>
           <MainComponent.GroupItem />
          </article>
        </div>
      </section>
      <section className="flex flex-col lg:flex-row w-full gap-10 lg:gap-20 justify-between my-12">
        <Participants />
        <Recipient />
      </section>
      <section className="w-full">
        <GroupEventComponent />
      </section>
    </div>
  );
}

MainComponent.GroupItem = () => {
  return (
    <section className="flex mt-5 gap-10 flex-wrap lg:flex-nowrap">
      {MainComponent.groups.map((group) => (
        <div className="flex flex-col gap-2" key={group.id}>
          <div className="flex items-center justify-center bg-[#FFEBEC]/90 w-10 h-10 rounded-lg cursor-pointer">
            <Image
              src={group.icon}
              width={24}
              height={24}
              alt=""
              className="w-[24px] h-[24px]"
            />
          </div>
          <h3 className="text-xl font-semibold text-white">{group.name}</h3>
          <span className="text-[#00FFFF] text-sm">{group.amount}</span>
        </div>
      ))}
    </section>
  );
};

MainComponent.groups = [
  { id: 1, name: "Group Admin Address", amount: "500 Ether", icon: edit },
  { id: 2, name: "Collateral Amount", amount: "500 Ether", icon: dollar },
  { id: 3, name: "Total No of Members", amount: "500", icon: groupedUser },
  { id: 4, name: "Group State", amount: "500 Ether", icon: checked },
];
