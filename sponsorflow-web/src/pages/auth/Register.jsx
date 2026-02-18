import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import Button from '../../components/ui/Button';
import { Rocket, Bolt } from 'lucide-react';
import clsx from 'clsx';

const Register = () => {
    const [role, setRole] = useState('BRAND'); // 'BRAND' or 'INFLUENCER'
    const [identifier, setIdentifier] = useState(''); // 'name' for Brand, 'name' for Influencer (based on login)
    const [username, setUsername] = useState(''); // Additional field for Influencer?
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    // Brand fields
    const [totalBudget, setTotalBudget] = useState('');

    // Influencer fields
    const [engagementRate, setEngagementRate] = useState('');
    const [followerCount, setFollowerCount] = useState('');
    const [platform, setPlatform] = useState('Instagram');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();
    // Registering usually doesn't log you in immediately in all flows, but let's assume redirect to login or auto-login.
    // Given the previous task requirements, we'll redirect to login after success.

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        setIdentifier('');
        setPassword('');
        setEmail('');
        setTotalBudget('');
        setUsername('');
        setEngagementRate('');
        setFollowerCount('');
        setPlatform('Instagram');
        setError('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            let endpoint;
            let payload;

            if (role === 'BRAND') {
                endpoint = '/auth/register/brand';
                payload = {
                    name: identifier,
                    email,
                    password,
                    totalBudget: parseFloat(totalBudget)
                };
            } else {
                endpoint = '/auth/register/influencer';
                payload = {
                    name: identifier,
                    email,
                    password,
                    username,
                    engagementRate: parseFloat(engagementRate),
                    followerCount: parseInt(followerCount),
                    platform
                };
            }

            await api.post(endpoint, payload);

            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 1000); // Wait a bit to show success message

        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
            <div className="w-full max-w-md bg-white dark:bg-[#1b252f] rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <div className="p-8">
                    <div className="flex justify-center mb-6">
                        <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center shadow-lg", role === 'BRAND' ? "bg-primary shadow-primary/20" : "bg-purple-600 shadow-purple-600/20")}>
                            {role === 'BRAND' ? <Rocket className="text-white w-6 h-6" /> : <Bolt className="text-white w-6 h-6" />}
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">Create Account</h2>
                    <p className="text-center text-slate-500 dark:text-slate-400 mb-8">Join as a {role === 'BRAND' ? 'Brand' : 'Influencer'}</p>

                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mb-8">
                        <button
                            onClick={() => handleRoleChange('BRAND')}
                            className={clsx(
                                "flex-1 py-2 text-sm font-bold rounded-md transition-all",
                                role === 'BRAND'
                                    ? "bg-white dark:bg-[#1b252f] text-slate-900 dark:text-white shadow-sm"
                                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            )}
                        >
                            Brand
                        </button>
                        <button
                            onClick={() => handleRoleChange('INFLUENCER')}
                            className={clsx(
                                "flex-1 py-2 text-sm font-bold rounded-md transition-all",
                                role === 'INFLUENCER'
                                    ? "bg-white dark:bg-[#1b252f] text-slate-900 dark:text-white shadow-sm"
                                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            )}
                        >
                            Influencer
                        </button>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                                {role === 'BRAND' ? 'Brand Name' : 'Name'}
                            </label>
                            <input
                                type="text"
                                required
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                placeholder={role === 'BRAND' ? "e.g. Acme Corp" : "e.g. John Doe"}
                            />
                        </div>

                        {role === 'BRAND' && (
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Total Budget ($)</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={totalBudget}
                                    onChange={(e) => setTotalBudget(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                    placeholder="50000"
                                />
                            </div>
                        )}

                        {role === 'INFLUENCER' && (
                            <>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Username</label>
                                    <input
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                        placeholder="@username"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Followers</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            value={followerCount}
                                            onChange={(e) => setFollowerCount(e.target.value)}
                                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                            placeholder="10000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Engagement Rate (%)</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            step="0.1"
                                            value={engagementRate}
                                            onChange={(e) => setEngagementRate(e.target.value)}
                                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                            placeholder="2.5"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Platform</label>
                                    <select
                                        value={platform}
                                        onChange={(e) => setPlatform(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                    >
                                        <option value="Instagram">Instagram</option>
                                        <option value="YouTube">YouTube</option>
                                        <option value="TikTok">TikTok</option>
                                        <option value="Twitter">Twitter</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-sm font-medium">
                                {success}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full justify-center"
                            size="lg"
                            isLoading={loading}
                        >
                            Create Account
                        </Button>

                        <div className="text-center mt-4">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    className="text-primary hover:text-primary/80 font-bold"
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
