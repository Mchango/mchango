import React from "react";
import GroupNameLogo from "../../components/GroupNameLogo";
import ParticipantListTable from "../../components/ParticipantListTable";
import GroupEvents from "@/app/components/GroupEvents";
import GroupDescription from "@/app/components/GroupDescription";

export default function GroupDetails() {
  return (
    <div className="flex  flex-col gap-[70px] w-full pb-[89px]">
      <GroupNameLogo />

      <div className="w-full flex justify-between gap-[60px]">
        <GroupDescription />
        <ParticipantListTable count={true} admin={false} />
      </div>
      <GroupEvents green={false} />
    </div>
  );
}
