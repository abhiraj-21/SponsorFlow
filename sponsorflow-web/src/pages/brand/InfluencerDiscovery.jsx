import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../api/axios';
import { Search, Users, Instagram, Youtube, Twitter } from 'lucide-react';

const platformIcons = {
    Instagram: <Instagram className="w-4 h-4" />,
    YouTube: <Youtube className="w-4 h-4" />,
    TikTok: <span className="text-xs font-bold">TT</span>,
    Twitter: <Twitter className="w-4 h-4" />,
};

const InfluencerDiscovery = () => {
    const [influencers, setInfluencers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('q') || '');

    useEffect(() => {
        const fetchInfluencers = async () => {
            try {
                const res = await api.get('/influencer?page=0&size=100');
                const data = res.data.content || res.data || [];
                setInfluencers(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Error fetching influencers:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchInfluencers();
    }, []);

    const filtered = influencers.filter(inf => {
        const q = search.toLowerCase();
        return (
            (inf.name || '').toLowerCase().includes(q) ||
            (inf.username || '').toLowerCase().includes(q) ||
            (inf.platform || '').toLowerCase().includes(q)
        );
    });

    return (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold dark:text-white">Influencer Discovery</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Browse all influencers registered on the platform
                </p>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, username, or platform..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#1b252f] border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white text-sm"
                />
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-[#1b252f] rounded-2xl border border-slate-200 dark:border-slate-800">
                    <Users className="w-12 h-12 text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium">
                        {search ? 'No influencers match your search' : 'No influencers registered yet'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((inf, idx) => {
                        const initials = (inf.name || inf.username || '?')
                            .split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
                        const followers = inf.followerCount
                            ? inf.followerCount >= 1000
                                ? `${(inf.followerCount / 1000).toFixed(1)}K`
                                : inf.followerCount
                            : '—';
                        return (
                            <div
                                key={inf.id || inf.username || idx}
                                className="bg-white dark:bg-[#1b252f] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                                        {initials}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-slate-900 dark:text-white truncate">
                                            {inf.name || inf.username}
                                        </p>
                                        {inf.username && inf.name && (
                                            <p className="text-xs text-slate-500 truncate">@{inf.username}</p>
                                        )}
                                    </div>
                                    {inf.platform && (
                                        <div className="ml-auto shrink-0 text-slate-400">
                                            {platformIcons[inf.platform] || <span className="text-xs">{inf.platform}</span>}
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2.5 text-center">
                                        <p className="text-sm font-extrabold text-slate-900 dark:text-white">{followers}</p>
                                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide mt-0.5">Followers</p>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2.5 text-center">
                                        <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                                            {inf.engagementRate != null ? `${inf.engagementRate}%` : '—'}
                                        </p>
                                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide mt-0.5">Engagement</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default InfluencerDiscovery;
