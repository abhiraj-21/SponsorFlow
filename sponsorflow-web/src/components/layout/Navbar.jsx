import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Plus } from 'lucide-react';

const Navbar = ({ setShowCreateOfferModal }) => {
    const { role } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/discovery?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header className="h-16 flex items-center justify-between px-8 bg-white/80 dark:bg-[#101922]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-10 sticky top-0">
            <div className="flex items-center gap-4">
                {role === 'BRAND' ? (
                    <>
                        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h2>
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-bold text-primary uppercase tracking-wide">Live Feed</span>
                        </div>
                    </>
                ) : (
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Earnings Dashboard</h2>
                )}
            </div>

            <div className="flex items-center gap-4">
                {role === 'BRAND' ? (
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 text-slate-700 dark:text-slate-300 placeholder-slate-400"
                            placeholder="Search influencers..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                ) : (
                    <div className="relative">
                        <Bell className="text-slate-500 hover:text-primary cursor-pointer transition-colors w-6 h-6" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#101922]"></span>
                    </div>
                )}

                {role === 'BRAND' ? (
                    <button
                        onClick={() => setShowCreateOfferModal(true)}
                        className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-primary/25"
                    >
                        <Plus className="w-4 h-4" />
                        Create New Offer
                    </button>
                ) : (
                    <button className="bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2 px-4 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Pitch
                    </button>
                )}
            </div>
        </header>
    );
};

export default Navbar;
