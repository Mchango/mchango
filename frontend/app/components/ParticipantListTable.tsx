"use client";
import React, { useState } from "react";
// import personSvg from "../svgComponents/personSvg";
import IconDetails from "./iconDetails";
import PersonSvg from "../svgComponents/personSvg";
import LeftArrowSvg from "../svgComponents/leftArrowSvg";
import RightArrowSvg from "../svgComponents/rightArrowSvg";
import CountTag from "./CountTag";
// import Options from "../components/Options";

interface CountTag {
  count: boolean;
  admin: boolean;
}

interface DetailsIcon {
  id: string;
  name: string;
  date: string;
  svg: JSX.Element;
  option: JSX.Element;
}

interface StateOfButtons {
  [key: string]: boolean;
}

export default function ParticipantListTable(props: CountTag): JSX.Element {
  //initiialize an empty object
  const initialStateOfButtons: StateOfButtons = {};

  //set defualt of every state of buttons to false
  IconDetails().participants.forEach((button) => {
    initialStateOfButtons[button.id] = false;
  });

  //create  state of buttons and pass the states to it
  const [buttonsState, setButtonsState] = useState<StateOfButtons>(
    initialStateOfButtons
  );

  //create function to handle state change by  id of buttons
  const handleStateChange = (buttonClicked: string) => {
    //create an empty  object to hold the updated state of buttons
    const updatedStates: StateOfButtons = {};
    //iterating through all the button states
    for (const key in buttonsState) {
      if (key !== buttonClicked) {
        updatedStates[key] = false;
      }
    }

    setButtonsState({
      ...updatedStates,
      [buttonClicked]: !buttonsState[buttonClicked],
    });
  };

  return (
    <div className="flex w-full flex-col">
      <p className="text-sky font-nunito text-3xl font-bold not-italic">
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
          {IconDetails().participants.map((item) => (
            <tr
              key={item.id}
              className="w-full h-[59px] 	border-solid border-y-[1px] border-grey"
            >
              <td>{item.svg}</td>
              <td className="text-white font-normal not-italic font-nunito  text-base">
                {item.name}
              </td>
              <td className="text-white font-normal not-italic font-nunito  text-base">
                {item.dateJoined}
              </td>
              {props.admin && (
                <td className="w-[100px] ">
                  {
                    <div onClick={() => handleStateChange(item.id)}>
                      {item.option}
                      <div>
                        {buttonsState[item.id] && (
                          <div className="flex flex-col gap-1 absolute w-[150px]">
                            <div className="px-[4px] py-[5px] bg-redBtn rounded-[2px] items-center">
                              <h2>Remove member</h2>
                            </div>
                            <div className="px-[4px] py-[5px] bg-purpleSmallDeep rounded-[2px] items-center">
                              <h2>Message member</h2>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  }
                </td>
              )}
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
      {props.count && <CountTag />}
    </div>
  );
}
