
import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import StatCard from '../../components/ui/StatCard';
import DashboardTable from '../../components/ui/DashboardTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { DollarSign, Wallet, Megaphone, Plus } from 'lucide-react';

const BrandDashboard = () => {
    const [stats, setStats] = useState(null);
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state
    const [influencerName, setInfluencerName] = useState('');
    const [amount, setAmount] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [offerError, setOfferError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, offersRes] = await Promise.all([
                    api.get('/brand/me'),
                    api.get('/offers')
                ]);
                setStats(statsRes.data);

                // Handle paginated response or direct array

                const offersData = offersRes.data.content || offersRes.data || [];
                setOffers(Array.isArray(offersData) ? offersData : []);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCreateOffer = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setOfferError('');
        try {
            const payload = {
                influencerName,
                amount: parseFloat(amount)
            };

            await api.post('/offers', payload);

            // Refresh offers and stats
            const [offersRes, statsRes] = await Promise.all([
                api.get('/offers'),
                api.get('/brand/me')
            ]);
            const offersData = offersRes.data.content || offersRes.data || [];
            setOffers(Array.isArray(offersData) ? offersData : []);
            setStats(statsRes.data);

            setIsModalOpen(false);
            setInfluencerName('');
            setAmount('');
        } catch (error) {
            console.error('Error creating offer:', error);
            const msg = error.response?.data?.message || error.response?.data || 'Failed to create offer. Please try again.';
            setOfferError(typeof msg === 'string' ? msg : JSON.stringify(msg));
        } finally {
            setSubmitting(false);
        }
    };

    const getStatus = (row) => row.status || row.offerStatus || 'PENDING';
    const getId = (o) => {
        if (!o) return null;
        const id = o.id ?? o.offerId ?? o.offer_id ?? o._id;
        if (id !== null && id !== undefined) return id;
        return o.offer?.id ?? o.offer?.offerId ?? o.offer?.offer_id;
    };

    const columns = [
        {
            header: 'Offer ID', accessor: 'id', render: (row) => {
                const id = getId(row);
                return <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{(id !== null && id !== undefined) ? `#${id}` : '---'}</span>;
            }
        },
        {
            header: 'Influencer',
            accessor: 'influencerName',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                        {(row.influencerName || '?').charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{row.influencerName}</p>
                    </div>
                </div>
            )
        },
        { header: 'Amount', accessor: 'amount', render: (row) => <span className="font-medium text-slate-900 dark:text-white">${row.amount}</span> },
        {
            header: 'Status', accessor: 'status', render: (row) => {
                const s = getStatus(row);
                const colors = {
                    PENDING: 'bg-amber-500/10 text-amber-500',
                    ACCEPTED: 'bg-emerald-500/10 text-emerald-500',
                    REJECTED: 'bg-red-500/10 text-red-500',
                };
                return <span className={`text-xs font-bold px-2 py-1 rounded-full ${colors[s] || 'bg-slate-100 text-slate-500'}`}>{s}</span>;
            }
        },
        {
            header: 'Actions',
            render: () => <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white">...</button>
        }
    ];

    if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

    // Calculated fields based on available data
    // If totalBudget is missing, assume it's equal to availableBudget for now to avoid 0 (this shouldn't happen with correct API)
    // Or just display availableBudget if totalBudget is 0
    const totalBudgetVal = stats?.totalBudget || stats?.availableBudget || 0;
    const availableBudgetVal = stats?.availableBudget || 0;
    const remainingPercentage = totalBudgetVal > 0 ? Math.round((availableBudgetVal / totalBudgetVal) * 100) : 0;

    return (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {/* Header with Create Button for Mobile/Tablet if not in navbar */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">Dashboard</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back, {stats?.name}</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} size="sm">
                    <Plus className="w-4 h-4 mr-1" /> New Offer
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Total Budget"
                    value={totalBudgetVal}
                    subtitle="Fiscal Year Allocation"
                    icon={DollarSign}
                    color="blue"
                    trend="Standard"
                    isCurrency
                />
                <StatCard
                    title="Remaining Budget"
                    value={availableBudgetVal}
                    subtitle={`${remainingPercentage}% Remaining`}
                    icon={Wallet}
                    color="orange"
                    trend={`Spent ${100 - remainingPercentage}% `}
                    trendPositive={false}
                    isCurrency
                />
                <StatCard
                    title="Active Offers"
                    value={offers.filter(o => {
                        const s = o.status || o.offerStatus;
                        return s === 'PENDING' || s === 'ACCEPTED';
                    }).length}
                    subtitle="Current Campaigns"
                    icon={Megaphone}
                    color="purple"
                    trend={`${remainingPercentage}% Remaining`}
                />
            </div>

            <DashboardTable
                title="Recent Offers"
                subtitle="Activity from the last 30 days"
                data={offers}
                columns={columns}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Offer"
            >
                <form onSubmit={handleCreateOffer} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Influencer Username</label>
                        <input
                            type="text"
                            required
                            value={influencerName}
                            onChange={(e) => setInfluencerName(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            placeholder="@alexrivers"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Offer Amount ($)</label>
                        <input
                            type="number"
                            required
                            min="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            placeholder="1000"
                        />
                    </div>
                    {offerError && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-medium">
                            {offerError}
                        </div>
                    )}
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="secondary" onClick={() => { setIsModalOpen(false); setOfferError(''); }} type="button">Cancel</Button>
                        <Button type="submit" isLoading={submitting}>Send Offer</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default BrandDashboard;
