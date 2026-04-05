import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import * as hooks from '../hooks/usePerksHistory';
import HistoryEntry from '../components/HistoryEntry';
import { FiActivity, FiBriefcase, FiCoffee, FiLayers, FiAlertCircle } from 'react-icons/fi';

export default function PerksHistory() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('rooms');

    const tabs = [
        { id: 'rooms', label: 'Rooms', icon: <FiLayers />, hook: hooks.useRoomsHistory },
        { id: 'shared', label: 'Shared Space', icon: <FiBriefcase />, hook: hooks.useSharedSpaceHistory },
        { id: 'desk', label: 'Desks', icon: <FiActivity />, hook: hooks.useDeskHistory },
        { id: 'cafe', label: 'Cafe', icon: <FiCoffee />, hook: hooks.useCafeHistory },
    ];

    const currentTab = tabs.find(t => t.id === activeTab);
    const { data: history, isLoading, error } = currentTab.hook(user?.id);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Perks Usage History</h1>
                        <p className="text-gray-500 font-medium mt-1">Full record of your premium space and service utilization.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                                    activeTab === tab.id 
                                    ? 'bg-primary text-black shadow-xl scale-105' 
                                    : 'text-gray-400 hover:text-secondary hover:bg-primary/5'
                                }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-48 bg-white border border-gray-100 rounded-3xl animate-pulse"></div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
                        <FiAlertCircle className="mx-auto text-5xl text-rose-500 mb-4" />
                        <h3 className="text-xl font-black text-gray-900">Failed to load history</h3>
                        <p className="text-gray-400 font-medium mt-1">Please check your connection and try again.</p>
                    </div>
                ) : history?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {history.map(entry => (
                            <HistoryEntry key={entry._id} entry={entry} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            {currentTab.icon}
                        </div>
                        <h3 className="text-2xl font-black text-gray-900">No {currentTab.label} History</h3>
                        <p className="text-gray-400 font-medium mt-1 max-w-sm mx-auto">
                            You haven't used any {currentTab.label.toLowerCase()} perks yet. Visit the space to start earning!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
