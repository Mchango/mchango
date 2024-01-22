import React from "react";
import personSvg from "../svgComponents/personSvg";
// import data from "../data.json";
import IconDetails from "./iconDetails";
import ParticipantSVG from "../svgComponents/ParticipantSVG";

// interface Token {
//   participantName: string;
//   participantDate: string;
//   participantSVG: string;
// }
export default function ParticipantListTable() {
  //   const tokens: Token[] = data;
  return (
    <div className="flex justify-center">
      <table className="w-[90%]  text-sm text-left rtl:text-right text-[#FFFFFF]">
        <thead className="text-xs uppercase bg-[#345A5A]">
          <tr className="text-[13.3px] font-bold text-[#FFFFFF] tracking-[0.4px] ">
            <th scope="col">
              <ParticipantSVG />
            </th>
            <th scope="col" className="px-6 py-[15.7px]">
              Name
            </th>
            <th scope="col" className="px-6 py-[15.7px]">
              Date Joined
            </th>
          </tr>
        </thead>
        <tbody>
          {IconDetails().participants.map((item, index) => (
            <tr key={index}>
              <td>{item.svg}</td>
              <td>{item.name}</td>
              <td>{item.dateJoined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
