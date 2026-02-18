import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { formatCurrency } from '../../utils/format';
import { DollarSign, TrendingUp } from 'lucide-react';

const EarningsHistory = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await api.get('/offers');
                const data = res.data.content || res.data || [];
                const all = Array.isArray(data) ? data : [];
                // Only show accepted offers as earnings
                const accepted = all.filter(o => (o.status || o.offerStatus) === 'ACCEPTED');
                setOffers(accepted);
            } catch (err) {
                console.error('Error fetching earnings:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
    }, []);

    const getId = (o) => {
        if (!o) return null;
        const id = o.id ?? o.offerId ?? o.offer_id ?? o._id;
        if (id !== null && id !== undefined) return id;
        return o.offer?.id ?? o.offer?.offerId ?? o.offer?.offer_id;
    };
    const totalEarned = offers.reduce((sum, o) => sum + (o.amount || 0), 0);

    if (loading) return (
        <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="mb-8">
                <h2 className="text-2xl font-bold dark:text-white">Earnings History</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">All completed brand deals and payments</p>
            </div>

            {/* Total Earnings Card */}
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-2xl p-6 mb-8 flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Total Earned</p>
                    <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{formatCurrency(totalEarned)}</p>
                    <p className="text-xs text-slate-500 mt-1">{offers.length} completed deal{offers.length !== 1 ? 's' : ''}</p>
                </div>
            </div>

            {/* Earnings List */}
            {offers.length === 0 ? (
                <div className="bg-white dark:bg-[#1b252f] border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center">
                    <DollarSign className="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
                    <p className="text-slate-500 font-medium">No earnings yet.</p>
                    <p className="text-slate-400 text-sm mt-1">Accept an offer to start earning.</p>
                </div>
            ) : (
                <div className="bg-white dark:bg-[#1b252f] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="font-bold text-slate-900 dark:text-white">Completed Deals</h3>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {offers.map(offer => {
                            const id = getId(offer);
                            return (
                                <div key={id || Math.random()} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                            <DollarSign className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                {offer.brandName || 'Brand Deal'}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {(id !== null && id !== undefined) ? `Offer #${id}` : 'Completed'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-base font-extrabold text-emerald-500">+{formatCurrency(offer.amount)}</p>
                                        <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded font-bold uppercase">Accepted</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Total Earned</p>
                        <p className="text-lg font-extrabold text-primary">{formatCurrency(totalEarned)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EarningsHistory;
