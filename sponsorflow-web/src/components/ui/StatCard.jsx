import React from 'react';
import clsx from 'clsx';
import { formatCurrency } from '../../utils/format';

const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color = 'primary',
    trend,
    trendPositive = true,
    isCurrency = false
}) => {

    const colorStyles = {
        primary: 'bg-primary/10 text-primary',
        blue: 'bg-blue-500/10 text-primary',
        orange: 'bg-orange-500/10 text-orange-500',
        purple: 'bg-purple-500/10 text-purple-500',
        green: 'bg-emerald-500/10 text-emerald-500',
    };

    const trendColor = trendPositive ? 'text-emerald-500 bg-emerald-500/10' : 'text-red-500 bg-red-500/10';

    return (
        <div className="bg-white dark:bg-[#1b252f] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
                {Icon && (
                    <div className={clsx("p-3 rounded-lg", colorStyles[color] || colorStyles.primary)}>
                        <Icon className="w-6 h-6" />
                    </div>
                )}
                {trend && (
                    <span className={clsx("text-[11px] font-bold px-2 py-0.5 rounded-full", trendColor)}>
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">{title}</p>
                <h3 className="text-3xl font-extrabold mt-1 text-slate-900 dark:text-white">
                    {isCurrency ? formatCurrency(value) : value}
                </h3>
                {subtitle && <p className="text-[11px] text-slate-400 mt-2">{subtitle}</p>}
            </div>
        </div>
    );
};

export default StatCard;
