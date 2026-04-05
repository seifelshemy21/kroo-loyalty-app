import React from "react";
import { FaCoffee, FaClock, FaGift, FaUserCheck } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export default function Home() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6">
        {/* Modern Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between py-20 gap-16">
          <div className="lg:w-1/2 text-center lg:text-left space-y-8">
            <div className="inline-block px-4 py-1 bg-primary/10 rounded-full text-secondary text-sm font-bold tracking-widest uppercase mb-4">
              Premium Loyalty System
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight text-gray-900 tracking-tighter">
              The More You <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black">Visit</span>, The More You <span className="underline decoration-4">Earn.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-xl mx-auto lg:mx-0 font-medium">
              Join KROO's exclusive rewards program. Turn your daily visits into extraordinary perks.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
              <NavLink
                to={!isAuthenticated ? "/signup" : isAdmin ? "/admin/dashboard" : "/dashboard"}
                className="bg-primary text-black px-10 py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:opacity-90 transition shadow-2xl active:scale-95"
              >
                {isAuthenticated ? "Go to Dashboard" : "Join Now"} <FaArrowRightLong className="text-xl" />
              </NavLink>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-gray-100 to-white rounded-3xl blur-2xl opacity-50 -z-10"></div>
            <div className="bg-primary text-black p-10 rounded-[3rem] w-full max-w-md shadow-[0_50px_100px_-20px_rgba(255,185,0,0.3)] transform hover:rotate-2 transition-transform duration-500 border-4 border-white">
              <div className="flex justify-between items-start mb-16">
                <div className="w-16 h-1 bg-black/20 rounded-full"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Loyalty Priority</span>
              </div>
              <h3 className="text-3xl font-black mb-1 tracking-tight">KROO Priority</h3>
              <p className="text-black/40 text-sm font-bold tracking-widest uppercase">Member Card</p>
              
              <div className="grid grid-cols-3 gap-6 mt-12 mb-16">
                <div className="text-center group">
                  <div className="w-12 h-12 bg-black/10 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:bg-black group-hover:text-white transition-all">
                    <FaCoffee className="text-xl" />
                  </div>
                  <p className="text-[10px] font-bold uppercase opacity-40">Drinks</p>
                </div>
                <div className="text-center group">
                  <div className="w-12 h-12 bg-black/10 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:bg-black group-hover:text-white transition-all">
                    <FaClock className="text-xl" />
                  </div>
                  <p className="text-[10px] font-bold uppercase opacity-40">Hours</p>
                </div>
                <div className="text-center group">
                  <div className="w-12 h-12 bg-black/10 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:bg-black group-hover:text-white transition-all">
                    <FaGift className="text-xl" />
                  </div>
                  <p className="text-[10px] font-bold uppercase opacity-40">Perks</p>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-white/10 pt-6">
                <div className="space-y-1">
                  <div className="w-32 h-2 bg-white/5 rounded-full"></div>
                  <div className="w-20 h-2 bg-white/5 rounded-full"></div>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-20 italic">Validated: 2024</div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-24 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="group">
              <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-black transition-all transform group-hover:rotate-6 shadow-sm text-secondary">
                <FaUserCheck className="text-2xl" />
              </div>
              <h3 className="text-2xl font-black mb-4 underline decoration-primary decoration-4 underline-offset-8">Fast Check-in</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Simply tap your digital card at the desk to instantly earn points for every visit.</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-black transition-all transform group-hover:rotate-6 shadow-sm text-secondary">
                <FaClock className="text-2xl" />
              </div>
              <h3 className="text-2xl font-black mb-4 underline decoration-primary decoration-4 underline-offset-8">Track Progress</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Watch your tier rise in real-time on your private dash. More hours mean better perks.</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-black transition-all transform group-hover:rotate-6 shadow-sm text-secondary">
                <FaGift className="text-2xl" />
              </div>
              <h3 className="text-2xl font-black mb-4 underline decoration-primary decoration-4 underline-offset-8">Exclusive Perks</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Redeem your points for free meeting hours, premium coffee, and exclusive event access.</p>
            </div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="py-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm font-bold text-gray-400 gap-6">
          <p>© 2024 CREATIVE COLLECTIVE BY KROO</p>
          <div className="flex gap-8 uppercase tracking-[0.2em] text-[10px]">
            <NavLink className="hover:text-primary transition-colors">Privacy</NavLink>
            <NavLink className="hover:text-primary transition-colors">Terms</NavLink>
            <NavLink className="hover:text-primary transition-colors">Support</NavLink>
          </div>
        </footer>
      </div>
    </div>
  );
}
