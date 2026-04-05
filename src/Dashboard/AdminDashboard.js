import React from 'react';
import { useBusinessAnalytics } from '../hooks/useBusiness';
import { useCustomers } from '../hooks/useLoyalty';
import { FiUsers, FiStar, FiRefreshCcw, FiActivity, FiSettings, FiBriefcase, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { data: stats, isLoading: isStatsLoading } = useBusinessAnalytics();
  const { data: customers, isLoading: isCustomersLoading } = useCustomers();

  const metrics = [
    { label: 'Platform Users', value: stats?.totalUsers || (customers ? customers.length + 1 : '0'), icon: <FiUsers />, color: 'bg-indigo-600', trend: 'Total account base' },
    { label: 'Loyalty Customers', value: customers?.length || '0', icon: <FiBriefcase />, color: 'bg-emerald-600', trend: 'Active in program' },
    { label: 'Points Issued', value: stats?.totalPoints || '0', icon: <FiStar />, color: 'bg-amber-500', trend: 'Lifetime total' },
    { label: 'Redemptions', value: stats?.redemptions || '0', icon: <FiRefreshCcw />, color: 'bg-rose-500', trend: 'Successful claims' },
  ];

  const isLoading = isStatsLoading || isCustomersLoading;

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center h-96">
      <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 font-bold text-gray-400 animate-pulse uppercase tracking-[0.2em] text-[10px]">Loading Analytics</p>
    </div>
  );

  return (
    <div className="p-8 space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Admin Console</h1>
          <p className="text-gray-500 font-medium mt-1">Real-time loyalty program oversight & analytics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-gray-50 text-gray-600 px-5 py-3 rounded-2xl font-bold text-sm border border-gray-100 hover:bg-gray-100 transition">
            <FiSettings /> Settings
          </button>
          <Link to="/admin/user/create" className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl hover:bg-gray-800 transition transform hover:scale-105 active:scale-95">
            <FiPlus /> Add Customer
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <div className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-wider group-hover:bg-black group-hover:text-white transition-colors">
                Live
              </div>
            </div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{item.label}</p>
            <h3 className="text-3xl font-black text-gray-900 mb-2">{item.value}</h3>
            <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
              <FiActivity className="text-gray-300" /> {item.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Secondary Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-gray-900">Recent Transactions</h3>
            <button className="text-xs font-bold text-gray-400 hover:text-black transition">View All</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:bg-gray-50 transition group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-xs text-gray-500">
                    {i+1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Points Redemptions</p>
                    <p className="text-[10px] font-medium text-gray-400">Customer ID: #440{i}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-rose-500">-250 pts</p>
                  <p className="text-[10px] font-bold text-gray-300 uppercase">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Management */}
        <div className="bg-black text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full blur-3xl"></div>
          <h3 className="text-xl font-black mb-6 relative z-10">Program Rewards</h3>
          <div className="space-y-4 relative z-10">
            <div className="p-5 bg-white/10 rounded-2xl border border-white/5 backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Standard Perk</p>
              <p className="font-bold">Free Premium Coffee</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs font-black px-2 py-1 bg-white text-black rounded-lg">10 Points</span>
                <span className="text-[10px] font-bold opacity-40 italic">Active</span>
              </div>
            </div>
            <div className="p-5 bg-white/10 rounded-2xl border border-white/5 backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Elite Perk</p>
              <p className="font-bold">1 Hour Meeting Room</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs font-black px-2 py-1 bg-white text-black rounded-lg">50 Points</span>
                <span className="text-[10px] font-bold opacity-40 italic">Active</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-8 bg-white text-black py-4 rounded-2xl font-black text-sm hover:bg-gray-100 transition shadow-lg">
            Manage Rewards
          </button>
        </div>
      </div>
    </div>
  );
}
