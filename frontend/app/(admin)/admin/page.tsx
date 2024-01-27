import AdminComponent from "@/app/components/admin/AdminComponent";

export default async function AdminPage() {
  return (
    <div className="bg-[#021D1D] h-screen overflow-y-scroll">
      <div className="w-full flex items-center justify-center">
        <AdminComponent />
      </div>
    </div>
  );
}
