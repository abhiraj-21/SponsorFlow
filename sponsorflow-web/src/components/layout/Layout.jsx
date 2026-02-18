import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const Layout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { role } = useAuth();

    // Modal State
    const [influencerName, setInfluencerName] = useState('');
    const [amount, setAmount] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [offerError, setOfferError] = useState('');

    const closeModal = () => {
        setIsModalOpen(false);
        setOfferError('');
        setInfluencerName('');
        setAmount('');
    };

    const handleCreateOffer = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setOfferError('');
        try {
            await api.post('/offers', {
                influencerName,
                amount: parseFloat(amount)
            });
            closeModal();
            window.location.reload();
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || error.response?.data || 'Failed to send offer. Please try again.';
            setOfferError(typeof msg === 'string' ? msg : JSON.stringify(msg));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased h-screen overflow-hidden flex">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden">
                <Navbar setShowCreateOfferModal={setIsModalOpen} />
                <Outlet context={{ setIsModalOpen }} />

                {role === 'BRAND' && (
                    <Modal isOpen={isModalOpen} onClose={closeModal} title="Create New Offer">
                        <form onSubmit={handleCreateOffer} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Influencer Name</label>
                                <input
                                    type="text"
                                    required
                                    value={influencerName}
                                    onChange={(e) => setInfluencerName(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="e.g. Alex Rivers"
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
                                <Button variant="secondary" onClick={closeModal} type="button">Cancel</Button>
                                <Button type="submit" isLoading={submitting}>Send Offer</Button>
                            </div>
                        </form>
                    </Modal>
                )}
            </main>
        </div>
    );
};

export default Layout;
