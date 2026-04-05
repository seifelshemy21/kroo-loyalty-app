import { Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <div className="min-h-screen bg-transparent">
        <div className="w-full">
          <Outlet/>
        </div>
    </div>
  );
}
