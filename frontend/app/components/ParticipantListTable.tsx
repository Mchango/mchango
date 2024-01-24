import React from "react";
import personSvg from "../svgComponents/personSvg";
// import data from "../data.json";
import IconDetails from "./iconDetails";
// import ParticipantSVG from "../svgComponents/ParticipantSVG";
import PersonSvg from "../svgComponents/personSvg";
import LeftArrowSvg from "../svgComponents/leftArrowSvg";
import RightArrowSvg from "../svgComponents/rightArrowSvg";

// interface Token {
//   participantName: string;
//   participantDate: string;
//   participantSVG: string;
// }
export default function ParticipantListTable() {
  //   const tokens: Token[] = data;
  return (
    <div className="flex w-full flex-col">
      <p className="text-sky font-nunito text-2xl font-bold not-italic">
        Participants list
      </p>
      <table className="w-full  text-sm text-left rtl:text-right text-[#FFFFFF]">
        <thead className="text-xs uppercase ">
          <tr className="">
            <th scope="col" className="py-[15.7px]">
              <PersonSvg />
            </th>
            <th
              scope="col"
              className=" py-[15.7px] text-grey font-nunito text-base leading-tight"
            >
              Name
            </th>
            <th
              scope="col"
              className=" py-[15.7px] text-grey font-nunito text-base leading-tight"
            >
              Date Joined
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {IconDetails().participants.map((item, index) => (
            <tr
              key={index}
              className="w-full h-[59px] 	border-solid border-y-[1px] border-grey"
            >
              <td>{item.svg}</td>
              <td className="text-white font-normal not-italic font-nunito  text-base">
                {item.name}
              </td>
              <td className="text-white font-normal not-italic font-nunito  text-base">
                {item.dateJoined}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center h-[100px] items-center">
        <div>
          <p className="font-roboto text-white text-sm leading-normal">
            1-10 of 315
          </p>
        </div>
        <div className="flex justify-center">
          <LeftArrowSvg />
          <RightArrowSvg />
        </div>
      </div>
    </div>
  );
}
