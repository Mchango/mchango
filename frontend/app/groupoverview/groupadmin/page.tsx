import RecipientList from "@/app/components/RecipientList";
import GroupNameLogo from "../../components/GroupNameLogo";
import ParticipantListTable from "../../components/ParticipantListTable";
import React from "react";
import GroupEvents from "@/app/components/GroupEvents";

export default function GroupAdmin() {
  return (
    <div className="flex  flex-col gap-[70px] w-full pb-[89px]">
      <GroupNameLogo />

      <div className="w-full flex justify-between gap-[60px]">
        <ParticipantListTable count={false} admin={true} />
        <RecipientList />
      </div>
      <GroupEvents green={true} />
    </div>
  );
}
