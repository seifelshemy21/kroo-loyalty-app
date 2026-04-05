import React from 'react';
import { FiClock, FiStar, FiCalendar, FiActivity } from 'react-icons/fi';

export default function HistoryEntry({ entry }) {
    const { metadata, points, createdAt } = entry;
    const date = new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const statusColor = metadata.status === 'active' ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 text-gray-400';

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary text-black rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform">
                        <FiActivity />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">{metadata.title || 'Service Usage'}</h4>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-1">
                            <FiCalendar /> {date}
                        </p>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${statusColor}`}>
                    {metadata.status || 'Completed'}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2">
                    <FiClock className="text-gray-300" />
                    <div>
                        <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Duration</p>
                        <p className="text-xs font-bold text-gray-600">{metadata.duration || 'N/A'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-right">
                    <div className="flex-1">
                        <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Points</p>
                        <p className="text-xs font-bold text-gray-900 flex items-center justify-end gap-1">
                            {points} <FiStar className="text-amber-500" />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
