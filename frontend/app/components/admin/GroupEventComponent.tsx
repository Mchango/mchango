import React from "react";

export default function GroupEventComponent() {
  return (
    <section>
      <div>
        <h2 className="text-2xl text-[#00FFFF]">Group Event</h2>
        <p className="text-white/50 text-sm">
          Here you will find latest events from active groups.
        </p>
      </div>
      <GroupEventComponent.List />
    </section>
  );
}

GroupEventComponent.List = () => {
  return (
    <article className="text-sm">
      <div className="w-full bg-[#345A5A] uppercase flex justify-between mt-5 py-3 px-5 rounded-lg shadow">
        <span className="w-4/5">Operation</span>
        <span className="w-2/5">ID</span>
        <span className="w-2/5">Date And Time</span>
        <span className="w-1/5">Block</span>
      </div>
      {GroupEventComponent.Data.map((item) => (
        <div key={item.index} className="w-full flex justify-between py-3 px-5 text-white/50 border-white/50 shadow">
          <span className="w-4/5">{item.operation}</span>
          <span className="w-2/5">{item.id}</span>
          <span className="w-2/5">{item.date}</span>
          <span className="w-1/5">{item.block}</span>
        </div>
      ))}
    </article>
  );
};

GroupEventComponent.Data = [
  {
    index: 1,
    operation: "0xbbsjdjsnkdk has donated from group ‘adventure funds’",
    id: "1.11.167382826",
    date: "21/02/2056, 12:45:57",
    block: "25,719,012",
  },
  {
    index: 1,
    operation: "0xbbsjdjsnkdk has donated from group ‘adventure funds’",
    id: "1.11.167382826",
    date: "21/02/2056, 12:45:57",
    block: "25,719,012",
  },
  {
    index: 1,
    operation: "0xbbsjdjsnkdk has donated from group ‘adventure funds’",
    id: "1.11.167382826",
    date: "21/02/2056, 12:45:57",
    block: "25,719,012",
  },
  {
    index: 1,
    operation: "0xbbsjdjsnkdk has donated from group ‘adventure funds’",
    id: "1.11.167382826",
    date: "21/02/2056, 12:45:57",
    block: "25,719,012",
  },
  {
    index: 1,
    operation: "0xbbsjdjsnkdk has donated from group ‘adventure funds’",
    id: "1.11.167382826",
    date: "21/02/2056, 12:45:57",
    block: "25,719,012",
  },
];
