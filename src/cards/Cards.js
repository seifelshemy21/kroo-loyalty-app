import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../context/Context";
import { FaHome, FaCalendarCheck, FaGift, FaUsers, FaCog, FaClock } from "react-icons/fa";
import { IoGiftSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export default function Cards() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("stats"); // ✅ tab state
  const context = useContext(User);
  const token = context.auth.token;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setUsers(data.data))
      .catch((error) => console.log(error));
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 flex-col md:flex-row p-4 md:p-6 gap-6">
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-lg p-4 shadow-2xl">
          {/* User Info */}
          <div className="flex flex-col items-center text-center border-b pb-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg">
              {users?.name ? users.name.slice(0, 2).toUpperCase() : ""}
            </div>
            <h2 className="mt-2 font-bold">{users.name}</h2>
            <p className="text-gray-500 text-sm">Premium Member</p>
            <span className="mt-2 text-xs px-3 py-1 bg-gray-200 rounded-full">
              Premium Tier
            </span>
            <p className="text-xs text-gray-500 mt-1">75% to Elite</p>
            <div className="w-full h-2 bg-gray-100 rounded mt-1">
              <div className="h-2 bg-secondary rounded w-3/4 shadow-[0_0_10px_rgba(255,140,0,0.3)]"></div>
            </div>
            <button className="mt-4 bg-primary text-black font-black w-full py-3 rounded-2xl shadow-lg hover:opacity-90 transition active:scale-95 border-2 border-white">
              Check In
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-4 space-y-4 flex flex-col">
            <NavLink className="flex items-center space-x-2 text-gray-700 hover:text-black">
              <FaHome /> <span>Dashboard</span>
            </NavLink>
            <NavLink className="flex items-center space-x-2 text-gray-700 hover:text-black">
              <FaCalendarCheck /> <span>Bookings</span>
            </NavLink>
            <NavLink className="flex items-center space-x-2 text-gray-700 hover:text-black">
              <FaGift /> <span>Rewards</span>
            </NavLink>
            <NavLink className="flex items-center space-x-2 text-gray-700 hover:text-black">
              <FaUsers /> <span>Community</span>
            </NavLink>
            <NavLink className="flex items-center space-x-2 text-gray-700 hover:text-black">
              <FaCog /> <span>Settings</span>
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {/* Loyalty Overview */}
          <div className="bg-white rounded-lg shadow-2xl p-4">
            <h2 className="font-bold text-lg">Loyalty Overview</h2>
            <p className="text-gray-500 text-sm">
              Track your progress and rewards
            </p>

            {/* Tabs */}
            <div className="bg-gray-100 p-1 rounded-2xl flex justify-between md:justify-around gap-2 md:gap-8 mt-4 overflow-x-auto">
              <button
                onClick={() => setActiveTab("stats")}
                className={`px-6 md:px-28 py-1 rounded-lg font-semibold ${
                  activeTab === "stats" ? "bg-white shadow-xl" : "text-gray-700"
                }`}
              >
                Stats
              </button>
              <button
                onClick={() => setActiveTab("perks")}
                className={`px-6 md:px-28 py-1 rounded-lg font-semibold ${
                  activeTab === "perks" ? "bg-white shadow-xl" : "text-gray-700"
                }`}
              >
                Perks
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-6 md:px-28 py-1 rounded-lg font-semibold ${
                  activeTab === "history" ? "bg-white shadow-xl" : "text-gray-700"
                }`}
              >
                History
              </button>
            </div>

            {/* Tabs Content */}
            <div className="mt-6">
              {activeTab === "stats" && (
                <>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-xl border">
                      <p className="text-gray-500 flex items-center gap-2">
                        Total Visits
                      </p>
                      <h3 className="text-2xl font-bold">42</h3>
                      <p className="text-xs text-gray-500">+5 from last month</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-xl border">
                      <p className="text-gray-500 flex items-center gap-2">
                        Hours Used <FaClock />
                      </p>
                      <h3 className="text-2xl font-bold">168</h3>
                      <p className="text-xs text-gray-500">+24 from last month</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-xl border">
                      <p className="text-gray-500 flex items-center gap-2">
                        Loyalty Points <IoGiftSharp />
                      </p>
                      <h3 className="text-2xl font-bold">750</h3>
                      <p className="text-xs text-gray-500">+120 from last month</p>
                    </div>
                  </div>

                  {/* Tier Progress */}
                  <div className="mt-6">
                    <h3 className="font-semibold">Tier Progress</h3>
                    <div className="space-y-3 mt-2">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-primary text-black px-2 py-1 rounded-lg">
                          Basic
                        </span>{" "}
                        <span className="text-sm font-bold">0-250 points</span>
                        <div className="w-full h-2 bg-gray-100 rounded mt-1">
                          <div className="h-2 bg-secondary rounded w-full"></div>
                        </div>
                        <p className="text-xs text-right text-gray-500">
                          Completed
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-primary text-black px-2 py-1 rounded-lg">
                          Standard
                        </span>{" "}
                        <span className="text-sm font-bold">251-500 points</span>
                        <div className="w-full h-2 bg-gray-100 rounded mt-1">
                          <div className="h-2 bg-secondary rounded w-full"></div>
                        </div>
                        <p className="text-xs text-right text-gray-500">
                          Completed
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-primary text-black px-2 py-1 rounded-lg">
                          Premium
                        </span>{" "}
                        <span className="text-sm font-bold">501-1000 points</span>
                        <div className="w-full h-2 bg-gray-100 rounded mt-1">
                          <div className="h-2 bg-secondary rounded w-3/4 shadow-[0_0_10px_rgba(255,140,0,0.3)]"></div>
                        </div>
                        <p className="text-xs text-right text-gray-500">
                          750/1000
                        </p>
                      </div>
                      <div>
                        <span className="text-xs bg-gray-400 text-white px-2 py-1 rounded">
                          Elite
                        </span>{" "}
                        <span className="text-sm">1001+ points</span>
                        <div className="w-full h-2 bg-gray-200 rounded mt-1">
                          <div className="h-2 bg-gray-300 rounded w-0"></div>
                        </div>
                        <p className="text-xs text-right text-gray-500">
                          Locked
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "perks" && (
                <div className="text-gray-600 space-y-3">
                  <h3 className="font-semibold text-lg">Your Perks</h3>
                  <ul className="list-disc list-inside">
                    <li>✔ Free Coffee every visit</li>
                    <li>✔ Discounted Meeting Rooms</li>
                    <li>✔ Exclusive Community Events</li>
                  </ul>
                </div>
              )}

              {activeTab === "history" && (
                <div className="text-gray-600">
                  <h3 className="font-semibold text-lg mb-2">Visit History</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Aug 21, 2025 - Checked in (5 hrs)</li>
                    <li>Aug 15, 2025 - Checked in (3 hrs)</li>
                    <li>Aug 10, 2025 - Checked in (7 hrs)</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
