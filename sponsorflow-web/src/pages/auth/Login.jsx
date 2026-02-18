import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import Button from '../../components/ui/Button';
import { Rocket, Bolt } from 'lucide-react';
import clsx from 'clsx';

const Login = () => {
    const [role, setRole] = useState('BRAND'); // 'BRAND' or 'INFLUENCER'
    const [identifier, setIdentifier] = useState(''); // 'name' for Brand, 'username' for Influencer
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    // Reset identifier when role changes
    const handleRoleChange = (newRole) => {
        setRole(newRole);
        setIdentifier('');
        setPassword('');
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            let endpoint;
            let payload;

            if (role === 'BRAND') {
                endpoint = '/auth/login/brand';
                payload = { name: identifier, password };
            } else {
                endpoint = '/auth/login/influencer';
                payload = { name: identifier, password };
            }

            const response = await api.post(endpoint, payload);
            const { token } = response.data;

            login(token, role);

            setSuccess('Login successful! Redirecting...');
            setTimeout(() => {
                navigate('/dashboard');
            }, 500);

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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

                    <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">Welcome Back</h2>
                    <p className="text-center text-slate-500 dark:text-slate-400 mb-8">Sign in to your {role === 'BRAND' ? 'Brand' : 'Influencer'} account</p>

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

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                                {role === 'BRAND' ? 'Brand Name' : 'Username'}
                            </label>
                            <input
                                type="text"
                                required
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                placeholder={role === 'BRAND' ? "e.g. Acme Corp" : "e.g. influencer123"}
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
                            Sign In
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
