import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/format';
import { Megaphone, CheckCircle, Clock, XCircle } from 'lucide-react';

const Campaigns = () => {
    const { role } = useAuth();
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await api.get('/offers');
                const data = res.data.content || res.data || [];
                setOffers(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Error fetching campaigns:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
    }, []);

    const getStatus = (o) => o.status || o.offerStatus || 'PENDING';
    const getId = (o) => {
        if (!o) return null;
        const id = o.id ?? o.offerId ?? o.offer_id ?? o._id;
        if (id !== null && id !== undefined) return id;
        return o.offer?.id ?? o.offer?.offerId ?? o.offer?.offer_id;
    };

    // For brand: all accepted offers are active campaigns
    // For influencer: same — accepted offers are their active campaigns
    const campaigns = offers.filter(o => getStatus(o) === 'ACCEPTED');
    const pending = offers.filter(o => getStatus(o) === 'PENDING');
    const rejected = offers.filter(o => getStatus(o) === 'REJECTED');

    if (loading) return (
        <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="mb-8">
                <h2 className="text-2xl font-bold dark:text-white">Campaigns</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {role === 'BRAND' ? 'Track all your active sponsorship campaigns' : 'Your active brand partnerships'}
                </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white dark:bg-[#1b252f] border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{campaigns.length}</p>
                        <p className="text-xs font-bold text-emerald-500 uppercase tracking-wide">Active</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1b252f] border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{pending.length}</p>
                        <p className="text-xs font-bold text-amber-500 uppercase tracking-wide">Pending</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1b252f] border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{rejected.length}</p>
                        <p className="text-xs font-bold text-red-500 uppercase tracking-wide">Rejected</p>
                    </div>
                </div>
            </div>

            {/* Active Campaigns */}
            <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-primary" />
                    Active Campaigns
                </h3>
                {campaigns.length === 0 ? (
                    <div className="bg-white dark:bg-[#1b252f] border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center">
                        <Megaphone className="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
                        <p className="text-slate-500 font-medium">No active campaigns yet.</p>
                        <p className="text-slate-400 text-sm mt-1">
                            {role === 'BRAND' ? 'Create an offer and wait for an influencer to accept it.' : 'Accept an offer to start a campaign.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {campaigns.map(offer => {
                            const id = getId(offer);
                            return (
                                <div key={id || Math.random()} className="bg-white dark:bg-[#1b252f] border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-primary/40 transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Megaphone className="w-5 h-5 text-primary" />
                                        </div>
                                        <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full font-bold uppercase">Active</span>
                                    </div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                                        {role === 'BRAND' ? (offer.influencerName || 'Influencer') : (offer.brandName || 'Brand')} Deal
                                    </h4>
                                    <p className="text-xs text-slate-500 mb-3">
                                        {role === 'BRAND' ? `@${offer.influencerName}` : `From: ${offer.brandName || 'Brand'}`}
                                    </p>
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                                        <span className="text-xs text-slate-500">Deal Value</span>
                                        <span className="text-base font-extrabold text-primary">{formatCurrency(offer.amount)}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* All Offers Table */}
            {offers.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">All Offers</h3>
                    <div className="bg-white dark:bg-[#1b252f] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800">
                                    <th className="text-left text-xs font-bold uppercase text-slate-400 px-6 py-4">ID</th>
                                    <th className="text-left text-xs font-bold uppercase text-slate-400 px-6 py-4">
                                        {role === 'BRAND' ? 'Influencer' : 'Brand'}
                                    </th>
                                    <th className="text-left text-xs font-bold uppercase text-slate-400 px-6 py-4">Amount</th>
                                    <th className="text-left text-xs font-bold uppercase text-slate-400 px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {offers.map(offer => {
                                    const id = getId(offer);
                                    const status = getStatus(offer);
                                    const statusColors = {
                                        ACCEPTED: 'bg-emerald-500/10 text-emerald-500',
                                        PENDING: 'bg-amber-500/10 text-amber-500',
                                        REJECTED: 'bg-red-500/10 text-red-500',
                                    };
                                    return (
                                        <tr key={id || Math.random()} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4 text-sm font-bold text-slate-500">{(id !== null && id !== undefined) ? `#${id}` : '---'}</td>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                                {role === 'BRAND' ? (offer.influencerName || '—') : (offer.brandName || '—')}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(offer.amount)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[status] || 'bg-slate-100 text-slate-500'}`}>
                                                    {status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Campaigns;
