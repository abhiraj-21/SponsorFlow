import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';
import {
    LayoutDashboard,
    Gift,
    Search,
    BarChart3,
    Settings,
    HelpCircle,
    Inbox,
    DollarSign,
    User,
    LogOut,
    Rocket
} from 'lucide-react';

const Sidebar = () => {
    const { role, logout, user } = useAuth();

    const displayName = user?.name || user?.username || (role === 'BRAND' ? 'Brand User' : 'Influencer User');
    const initials = displayName
        .split(' ')
        .map(w => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    const brandLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'My Offers', path: '/offers', icon: Gift },
        { name: 'Influencer Discovery', path: '/discovery', icon: Search },
        { name: 'Campaigns', path: '/campaigns', icon: BarChart3 },
    ];

    const influencerLinks = [
        { name: 'Inbox', path: '/dashboard', icon: Inbox },
        { name: 'Earnings History', path: '/earnings-history', icon: DollarSign },
        { name: 'Campaigns', path: '/campaigns', icon: BarChart3 },
        { name: 'Profile Settings', path: '/profile', icon: Settings },
    ];

    const links = role === 'BRAND' ? brandLinks : influencerLinks;
    const logoText = role === 'BRAND' ? 'Brand Portal' : 'Influencer Pro';
    const logoIcon = role === 'BRAND' ? <Rocket className="w-6 h-6 text-white" /> : <div className="material-symbols-outlined text-2xl font-bold text-white">bolt</div>;

    return (
        <aside className="w-64 flex-shrink-0 bg-white dark:bg-[#111820] border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                    {role === 'BRAND' ? <Rocket className="w-5 h-5 text-white" /> : <span className="text-white font-bold text-xl">⚡</span>}
                </div>
                <div>
                    <h1 className="font-display font-extrabold text-lg tracking-tight leading-none text-slate-900 dark:text-white">SponsorFlow</h1>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 mt-1">{logoText}</p>
                </div>
            </div>

            <nav className="mt-6 flex-1 px-3 space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                            clsx(
                                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all group',
                                isActive
                                    ? 'bg-primary/10 text-primary border-r-[3px] border-primary'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-primary'
                            )
                        }
                    >
                        <link.icon className="w-[22px] h-[22px]" />
                        <span className="font-semibold text-sm">{link.name}</span>
                    </NavLink>
                ))}

                {role === 'BRAND' && (
                    <>
                        <div className="pt-8 pb-4 px-4">
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Configuration</p>
                        </div>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                clsx(
                                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                                    isActive
                                        ? 'bg-primary/10 text-primary border-r-[3px] border-primary'
                                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-primary'
                                )
                            }
                        >
                            <Settings className="w-[22px] h-[22px]" />
                            <span className="font-semibold text-sm">Settings</span>
                        </NavLink>
                        <NavLink
                            to="/support"
                            className={({ isActive }) =>
                                clsx(
                                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                                    isActive
                                        ? 'bg-primary/10 text-primary border-r-[3px] border-primary'
                                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-primary'
                                )
                            }
                        >
                            <HelpCircle className="w-[22px] h-[22px]" />
                            <span className="font-semibold text-sm">Support</span>
                        </NavLink>
                    </>
                )}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                    <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                        {initials}
                    </div>
                    <div className="overflow-hidden flex-1">
                        <p className="text-xs font-bold truncate text-slate-900 dark:text-white">
                            {displayName}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                            {role} Account
                        </p>
                    </div>
                    <button onClick={logout} className="text-slate-400 hover:text-red-500 transition-colors" title="Logout">
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
