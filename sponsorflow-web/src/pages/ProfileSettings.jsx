import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { User, Save, CheckCircle } from 'lucide-react';

const ProfileSettings = () => {
    const { user, role, refreshUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Brand fields
    const [brandName, setBrandName] = useState('');
    const [totalBudget, setTotalBudget] = useState('');

    // Influencer fields
    const [influencerName, setInfluencerName] = useState('');
    const [username, setUsername] = useState('');
    const [followerCount, setFollowerCount] = useState('');
    const [engagementRate, setEngagementRate] = useState('');
    const [platform, setPlatform] = useState('Instagram');

    useEffect(() => {
        if (user) {
            if (role === 'BRAND') {
                setBrandName(user.name || '');
                setTotalBudget(user.totalBudget || '');
            } else {
                setInfluencerName(user.name || '');
                setUsername(user.username || '');
                setFollowerCount(user.followerCount || '');
                setEngagementRate(user.engagementRate || '');
                setPlatform(user.platform || 'Instagram');
            }
        }
    }, [user, role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            let endpoint;
            let payload;

            if (role === 'BRAND') {
                endpoint = '/brand/me';
                payload = {
                    name: brandName,
                    totalBudget: parseFloat(totalBudget),
                };
            } else {
                endpoint = '/influencer/me';
                payload = {
                    name: influencerName,
                    username,
                    followerCount: parseInt(followerCount),
                    engagementRate: parseFloat(engagementRate),
                    platform,
                };
            }

            // Use PATCH for profile updates
            await api.patch(endpoint, payload);

            setSuccess('Profile updated successfully!');
            refreshUser();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            const msg = err.response?.data?.message || err.response?.data || 'Failed to update profile. Please try again.';
            setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold dark:text-white">Profile Settings</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Update your {role === 'BRAND' ? 'brand' : 'influencer'} profile details
                    </p>
                </div>

                {/* Avatar Section */}
                <div className="bg-white dark:bg-[#1b252f] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mb-6 flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                        <User className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 dark:text-white text-lg">
                            {role === 'BRAND' ? (user?.name || 'Brand') : (user?.name || user?.username || 'Influencer')}
                        </p>
                        <p className="text-sm text-slate-500">{role} Account</p>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-[#1b252f] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {role === 'BRAND' ? (
                            <>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Brand Name</label>
                                    <input
                                        type="text"
                                        value={brandName}
                                        onChange={(e) => setBrandName(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                        placeholder="e.g. Acme Corp"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Total Budget ($)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={totalBudget}
                                        onChange={(e) => setTotalBudget(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                        placeholder="50000"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Full Name</label>
                                    <input
                                        type="text"
                                        value={influencerName}
                                        onChange={(e) => setInfluencerName(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                        placeholder="e.g. Alex Rivera"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Username</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                        placeholder="@username"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Followers</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={followerCount}
                                            onChange={(e) => setFollowerCount(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                            placeholder="10000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Engagement Rate (%)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.1"
                                            value={engagementRate}
                                            onChange={(e) => setEngagementRate(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                            placeholder="2.5"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Primary Platform</label>
                                    <select
                                        value={platform}
                                        onChange={(e) => setPlatform(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                    >
                                        <option value="Instagram">Instagram</option>
                                        <option value="YouTube">YouTube</option>
                                        <option value="TikTok">TikTok</option>
                                        <option value="Twitter">Twitter</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-500 text-sm font-medium flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                {success}
                            </div>
                        )}

                        <div className="pt-2">
                            <Button type="submit" isLoading={loading} className="flex items-center gap-2">
                                <Save className="w-4 h-4" />
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
