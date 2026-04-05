import React from 'react';
import { useUserProfile } from '../hooks/useLoyalty';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { FiUsers, FiCreditCard, FiStar, FiGift, FiClock, FiCheckCircle, FiActivity } from 'react-icons/fi';

export default function Dashboard() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useUserProfile();

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center h-96">
      <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 font-bold text-gray-400 animate-pulse uppercase tracking-[0.2em] text-[10px]">Loading Your Profile</p>
    </div>
  );

  const points = profile?.points || 0;
  const visits = profile?.visits || 0;
  const nextRewardThreshold = 1000;
  const progress = Math.min((points / nextRewardThreshold) * 100, 100);

  return (
    <div className="min-h-screen bg-white p-8">
      <main className="max-w-6xl mx-auto space-y-12">
        {/* Profile Header */}
        <div className="flex items-center justify-between border-b border-gray-50 pb-10">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-primary text-black rounded-[2rem] flex items-center justify-center text-4xl font-black shadow-2xl">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Welcome, {user?.name}</h1>
              <p className="text-gray-500 font-medium mt-1 uppercase tracking-widest text-[10px] bg-gray-50 inline-block px-3 py-1 rounded-lg">KROO Member Card</p>
            </div>
          </div>
          <div className="hidden md:flex gap-6">
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tier Status</p>
              <p className="text-sm font-black text-black">Priority Gold</p>
            </div>
          </div>
        </div>

        {/* Dynamic Rewards Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-primary text-black p-12 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(255,185,0,0.3)] relative overflow-hidden group hover:scale-[1.01] transition-transform duration-500">
            <div className="absolute top-0 right-0 w-80 h-80 bg-black/5 -mr-40 -mt-40 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-20 whitespace-nowrap">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 mb-2">Available Balance</p>
                  <h2 className="text-7xl font-black tracking-tighter">{points} <span className="text-lg uppercase tracking-[0.2em] opacity-40 ml-2">Points</span></h2>
                </div>
                <div className="w-16 h-16 border-2 border-black/10 rounded-3xl flex items-center justify-center text-3xl">
                  <FiStar className="text-black/40" />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <button className="bg-black text-white px-10 py-5 rounded-3xl font-black text-sm shadow-xl hover:bg-gray-800 transition transform hover:scale-105 active:scale-95">
                  Redeem Rewards
                </button>
                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest max-w-[120px]">Points earned from {visits} visits.</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-[3rem] p-10 flex flex-col justify-between border border-gray-100">
            <div>
              <h3 className="text-xl font-black text-gray-900 mb-6">Milestone Progress</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Next Tier Reward</p>
                    <p className="text-xs font-black">{Math.max(nextRewardThreshold - points, 0)} pts left</p>
                  </div>
                  <div className="h-4 bg-white rounded-full overflow-hidden border border-gray-100">
                    <div className="h-full bg-secondary rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(255,140,0,0.4)]" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-emerald-600">
                  <FiCheckCircle className="text-xl shrink-0" />
                  <p className="text-xs font-bold leading-tight">You've unlocked 3 meeting room vouchers this month!</p>
                </div>
              </div>
            </div>
            <Link 
              to="/dashboard/perks" 
              className="w-full mt-8 bg-primary text-black py-4 rounded-[2rem] font-black text-xs text-center uppercase tracking-[0.2em] shadow-xl hover:opacity-90 transition active:scale-95 flex items-center justify-center gap-2 border-2 border-white"
            >
              <FiActivity /> View All Perks History
            </Link>
          </div>
        </div>

        {/* Available Rewards Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-gray-900">Available Perks</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Valid Today</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Free Premium Coffee', cost: '10 pts', icon: <FiGift /> },
              { title: '1 Hour Meeting Room', cost: '50 pts', icon: <FiClock /> },
              { title: 'KROO Merchandise', cost: '120 pts', icon: <FiStar /> },
            ].map((perk, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group group cursor-pointer hover:border-black">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-xl text-gray-400 mb-8 transition-colors group-hover:bg-primary group-hover:text-black">
                  {perk.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{perk.title}</h4>
                <p className="text-sm font-black text-black/40 uppercase tracking-widest">{perk.cost}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
