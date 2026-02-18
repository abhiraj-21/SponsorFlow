import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import StatCard from '../../components/ui/StatCard';
import StatusPill from '../../components/ui/StatusPill';
import { DollarSign, Inbox, Users, Activity, Check, X } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

const InfluencerDashboard = () => {
    const [stats, setStats] = useState(null);
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    const fetchData = async () => {
        try {
            const [statsRes, offersRes] = await Promise.all([
                api.get('/influencer/me'),
                api.get('/offers')
            ]);
            setStats(statsRes.data);
            const offersData = offersRes.data.content || offersRes.data || [];
            setOffers(Array.isArray(offersData) ? offersData : []);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAction = async (offerId, status) => {
        setActionLoading(offerId);
        try {
            await api.patch(`/offers/${offerId}`, { offerStatus: status });
            // Re-fetch all offers to get the latest status from backend
            const offersRes = await api.get('/offers');
            const offersData = offersRes.data.content || offersRes.data || [];
            setOffers(Array.isArray(offersData) ? offersData : []);

            // Refresh stats if earning changed
            if (status === 'ACCEPTED') {
                const statsRes = await api.get('/influencer/me');
                setStats(statsRes.data);
            }
        } catch (error) {
            console.error(`Error ${status.toLowerCase()}ing offer:`, error);
            alert(`Failed to ${status.toLowerCase()} offer`);
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

    const pendingOffers = offers.filter(o => o.status === 'PENDING' || o.offerStatus === 'PENDING').length;
    const acceptedOffers = offers.filter(o => o.status === 'ACCEPTED' || o.offerStatus === 'ACCEPTED');

    const getStatus = (offer) => offer.status || offer.offerStatus || 'PENDING';
    const getId = (o) => {
        if (!o) return null;
        const id = o.id ?? o.offerId ?? o.offer_id ?? o._id;
        if (id !== null && id !== undefined) return id;
        return o.offer?.id ?? o.offer?.offerId ?? o.offer?.offer_id;
    };

    return (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold dark:text-white">Earnings Dashboard</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Manage your offers and track earnings</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Earnings"
                    value={stats?.totalEarnings || 0}
                    icon={DollarSign}
                    color="blue"
                    trend={`${acceptedOffers.length} Deals`}
                    isCurrency={true}
                />
                <StatCard
                    title="Total Reach"
                    value={stats?.followerCount ? `${(stats.followerCount / 1000).toFixed(1)}K` : '0'}
                    subtitle="Followers"
                    icon={Users}
                    color="orange"
                    trend={`${stats?.engagementRate || 0}% Engagement`}
                />
                <StatCard
                    title="Completed Deals"
                    value={acceptedOffers.length}
                    subtitle={`${pendingOffers} Pending`}
                    icon={Inbox}
                    color="green"
                    trend="Lifetime"
                    trendPositive={null}
                />
                <StatCard
                    title="Trust Score"
                    value={Math.min(99, 85 + (stats?.engagementRate || 0) + (stats?.totalEarnings > 0 ? 5 : 0)).toFixed(0)}
                    subtitle="Verified Account"
                    icon={Activity}
                    color="purple"
                    trend="Excellent"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                {/* Incoming Offers */}
                <div className="xl:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                            Incoming Offers
                            {pendingOffers > 0 && <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-md font-bold">NEW</span>}
                        </h4>
                    </div>

                    <div className="space-y-3">
                        {offers.length === 0 ? (
                            <div className="p-8 text-center text-slate-500 bg-white dark:bg-[#1b252f] rounded-xl border border-slate-200 dark:border-slate-800">No offers yet.</div>
                        ) : (
                            offers.map(offer => {
                                const offerStatus = getStatus(offer);
                                const offerId = getId(offer);
                                return (
                                    <div key={offerId || Math.random()} className="bg-white dark:bg-[#1b252f] border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4 hover:border-primary/50 transition-all group">
                                        <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                            <span className="text-sm font-bold text-slate-400">{(offerId !== null && offerId !== undefined) ? `#${offerId}` : '#?'}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h5 className="font-bold text-base truncate text-slate-900 dark:text-white">
                                                    Brand Deal {(offerId !== null && offerId !== undefined) ? `#${offerId}` : ''}
                                                </h5>
                                                {offerStatus === 'PENDING' && <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded font-bold uppercase">Action Required</span>}
                                            </div>
                                            <p className="text-sm text-slate-500 truncate">
                                                From: {offer.brandName || 'Brand'} • {formatCurrency(offer.amount)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right px-4 hidden sm:block">
                                                <p className="text-xl font-extrabold text-primary">{formatCurrency(offer.amount)}</p>
                                                <p className="text-[10px] text-slate-500 font-bold">Offer Amount</p>
                                            </div>
                                            {offerStatus === 'PENDING' ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleAction(offerId, 'ACCEPTED')}
                                                        disabled={actionLoading === offerId}
                                                        className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/10 flex items-center gap-1 disabled:opacity-50"
                                                    >
                                                        <Check className="w-3 h-3" /> Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(offerId, 'REJECTED')}
                                                        disabled={actionLoading === offerId}
                                                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-all border border-transparent flex items-center gap-1 disabled:opacity-50"
                                                    >
                                                        <X className="w-3 h-3" /> Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <StatusPill status={offerStatus} />
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Earnings History */}
                <div className="xl:col-span-1">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Earnings History</h4>
                    <div className="bg-white dark:bg-[#1b252f] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                        {acceptedOffers.length === 0 ? (
                            <div className="p-8 text-center text-slate-500">
                                <DollarSign className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                <p className="text-sm">No accepted offers yet.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {acceptedOffers.map((offer) => {
                                    const offerId = getId(offer);
                                    return (
                                        <div key={offerId || Math.random()} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                    {offer.brandName || 'Brand Deal'}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {(offerId !== null && offerId !== undefined) ? `Offer #${offerId}` : 'Completed'}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-extrabold text-emerald-500">
                                                    +{formatCurrency(offer.amount)}
                                                </p>
                                                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded font-bold uppercase">
                                                    ACCEPTED
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Total Earned</p>
                                    <p className="text-base font-extrabold text-primary">
                                        {formatCurrency(acceptedOffers.reduce((sum, o) => sum + (o.amount || 0), 0))}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfluencerDashboard;
