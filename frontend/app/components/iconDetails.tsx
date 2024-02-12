import Collateral from "../svgComponents/collateral";
import GroupAdmin from "../svgComponents/groupadmin";
import Totalmembers from "../svgComponents/totalmembers";
import ParticipantSVG from "../svgComponents/ParticipantSVG";
import Options from "./Options";

export default function IconDetails() {
  return {
    link: [
      {
        name: "Group Admin Address",
        amount: 500,
        icon: <GroupAdmin />,
      },
      {
        name: "Group Admin Address",
        amount: 500,
        icon: <Collateral />,
      },
      {
        name: "Total No of Customers",
        amount: 500,
        icon: <Totalmembers />,
      },
    ],
    participants: [
      {
        id: "1",
        name: "Deanna Ademola",
        dateJoined: "23rd November, 1920",
        svg: <ParticipantSVG />,
        option: <Options />,
      },
      {
        id: "2",
        name: "Deanna Ademola",
        dateJoined: "23rd November, 1920",
        svg: <ParticipantSVG />,
        option: <Options />,
      },
      {
        id: "3",
        name: "Deanna Ademola",
        dateJoined: "23rd November, 1920",
        svg: <ParticipantSVG />,
        option: <Options />,
      },
      {
        id: "4",
        name: "Deanna Ademola",
        dateJoined: "23rd November, 1920",
        svg: <ParticipantSVG />,
        option: <Options />,
      },
      {
        id: "5",
        name: "Deanna Ademola",
        dateJoined: "23rd November, 1920",
        svg: <ParticipantSVG />,
        option: <Options />,
      },
      {
        id: "6",
        name: "Deanna Ademola",
        dateJoined: "23rd November, 1920",
        svg: <ParticipantSVG />,
        option: <Options />,
      },
      {
        id: "7",
        name: "Deanna Ademolaaaaaaaaaaa",
        dateJoined: "23rd November, 1920",
        svg: <ParticipantSVG />,
        option: <Options />,
      },
      {
        id: "8",
        name: "Deanna Ademola",
        dateJoined: "23rd November, 1920",
        svg: <ParticipantSVG />,
        option: <Options />,
      },
      {
        id: "9",
        name: "Deanna Ademola",
        dateJoined: "23rd November, 1920",
        svg: <ParticipantSVG />,
        option: <Options />,
      },
      {
        id: "10",
        name: "Deanna Ademola",
        dateJoined: "23rd November, 1920",
        svg: <ParticipantSVG />,
        option: <Options />,
      },
    ],
  };
}
