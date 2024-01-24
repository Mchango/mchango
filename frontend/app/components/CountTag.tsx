import React from "react";
import CountSvg from "../svgComponents/countSvg";
import data from "../data.json";

interface countToken {
  groupCount: string;
}
export default function CountTag() {
  const tokens: countToken[] = data;
  return (
    <div>
      <div>
        <CountSvg />
      </div>
      <div>
        {tokens.map((token) => (
          <h2>{token.groupCount}</h2>
        ))}
        <p>Participant/Receive Count</p>
      </div>
    </div>
  );
}
