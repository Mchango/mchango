import GroupNameLogo from "../../components/GroupNameLogo";
import ParticipantListTable from "../../components/ParticipantListTable";
import React from "react";

export default function GroupMember() {
  return (
    <div className="flex  flex-col gap-[70px]">
      <GroupNameLogo />

      <div>
        <p className="text-white">
          <ParticipantListTable />
        </p>
      </div>
    </div>
  );
}
