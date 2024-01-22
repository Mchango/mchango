import SideNav from "../components/SideNav";

export default function Grouplayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div>
        <SideNav />
      </div>
      <div className="w-[78%] my-0 mx-auto">{children}</div>
    </div>
  );
}
