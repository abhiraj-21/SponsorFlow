import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { formatCurrency } from '../../utils/format';
import { Gift, Plus } from 'lucide-react';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';

const statusColors = {
    PENDING: 'bg-amber-500/10 text-amber-500',
    ACCEPTED: 'bg-emerald-500/10 text-emerald-500',
    REJECTED: 'bg-red-500/10 text-red-500',
};

const MyOffers = () => {
    const { user } = useAuth();
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [influencerName, setInfluencerName] = useState('');
    const [amount, setAmount] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [offerError, setOfferError] = useState('');

    const fetchOffers = async () => {
        try {
            const res = await api.get('/offers');
            const data = res.data.content || res.data || [];
            setOffers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching offers:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    const handleCreateOffer = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setOfferError('');
        try {
            await api.post('/offers', { influencerName, amount: parseFloat(amount) });
            await fetchOffers();
            setIsModalOpen(false);
            setInfluencerName('');
            setAmount('');
        } catch (err) {
            const msg = err.response?.data?.message || err.response?.data || 'Failed to create offer. Please try again.';
            setOfferError(typeof msg === 'string' ? msg : JSON.stringify(msg));
        } finally {
            setSubmitting(false);
        }
    };

    const getStatus = (o) => o.status || o.offerStatus || 'PENDING';
    const getId = (o) => {
        if (!o) return null;
        const id = o.id ?? o.offerId ?? o.offer_id ?? o._id;
        if (id !== null && id !== undefined) return id;
        return o.offer?.id ?? o.offer?.offerId ?? o.offer?.offer_id;
    };

    return (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">My Offers</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">All offers sent by your brand</p>
                </div>
                <Button onClick={() => { setIsModalOpen(true); setOfferError(''); }} size="sm">
                    <Plus className="w-4 h-4 mr-1" /> New Offer
                </Button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {['PENDING', 'ACCEPTED', 'REJECTED'].map(s => (
                    <div key={s} className="bg-white dark:bg-[#1b252f] border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center">
                        <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                            {offers.filter(o => getStatus(o) === s).length}
                        </p>
                        <p className={`text-xs font-bold mt-1 ${statusColors[s]?.split(' ')[1] || 'text-slate-500'}`}>{s}</p>
                    </div>
                ))}
            </div>

            {/* Offers list */}
            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
            ) : offers.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-[#1b252f] rounded-2xl border border-slate-200 dark:border-slate-800">
                    <Gift className="w-12 h-12 text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium">No offers yet</p>
                    <p className="text-slate-400 text-sm mt-1">Create your first offer to get started</p>
                </div>
            ) : (
                <div className="bg-white dark:bg-[#1b252f] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800">
                                <th className="text-left text-xs font-bold uppercase text-slate-400 px-6 py-4">Offer ID</th>
                                <th className="text-left text-xs font-bold uppercase text-slate-400 px-6 py-4">Influencer</th>
                                <th className="text-left text-xs font-bold uppercase text-slate-400 px-6 py-4">Amount</th>
                                <th className="text-left text-xs font-bold uppercase text-slate-400 px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {offers.map((offer, idx) => {
                                const id = getId(offer);
                                const status = getStatus(offer);
                                return (
                                    <tr key={id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">
                                            {(id !== null && id !== undefined) ? `#${id}` : '---'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                                                    {(offer.influencerName || '?').charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                                    {offer.influencerName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                                            {formatCurrency(offer.amount)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[status] || 'bg-slate-100 text-slate-500'}`}>
                                                {status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Create Offer Modal */}
            <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setOfferError(''); }} title="Create New Offer">
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

export default MyOffers;
