import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import { Settings, CheckCircle, AlertCircle } from 'lucide-react';

const BrandSettings = () => {
    const { user, refreshUser } = useAuth();
    const [form, setForm] = useState({
        name: '',
        budget: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/brand/me');
                setForm({
                    name: res.data.name || '',
                    budget: res.data.totalBudget ?? res.data.budget ?? '',
                });
            } catch (err) {
                console.error('Error fetching brand profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setSuccess(false);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccess(false);
        setError('');
        try {
            const payload = {
                name: form.name,
                totalBudget: parseFloat(form.budget),
            };
            await api.patch('/brand/me', payload);
            await refreshUser();
            setSuccess(true);
        } catch (err) {
            const msg = err.response?.data?.message || err.response?.data || 'Failed to update profile.';
            setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="mb-8">
                <h2 className="text-2xl font-bold dark:text-white">Settings</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Update your brand profile details</p>
            </div>

            <div className="max-w-xl">
                <div className="bg-white dark:bg-[#1b252f] border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100 dark:border-slate-800">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                            <Settings className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">Brand Profile</p>
                            <p className="text-xs text-slate-500">Update your brand information</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Brand Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white text-sm"
                                placeholder="Your brand name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Total Budget ($)
                            </label>
                            <input
                                type="number"
                                name="budget"
                                value={form.budget}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white text-sm"
                                placeholder="10000"
                            />
                            <p className="text-xs text-slate-400 mt-1">This is the total budget available for creating offers</p>
                        </div>

                        {success && (
                            <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-500 text-sm font-medium">
                                <CheckCircle className="w-4 h-4 shrink-0" />
                                Profile updated successfully!
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-medium">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="pt-2">
                            <Button type="submit" isLoading={saving} className="w-full">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BrandSettings;
