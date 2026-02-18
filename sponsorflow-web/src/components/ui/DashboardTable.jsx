import React from 'react';
import StatusPill from './StatusPill';
import { formatCurrency } from '../../utils/format';
import { MoreVertical } from 'lucide-react';

const DashboardTable = ({
    title,
    subtitle,
    data = [],
    columns = [],
    onAction,
    isLoading = false
}) => {
    if (isLoading) {
        return (
            <div className="bg-white dark:bg-[#111820] rounded-xl border border-slate-200 dark:border-slate-800 p-8 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#111820] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                            {columns.map((col, index) => (
                                <th key={index} className="px-6 py-4">{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-8 text-center text-slate-500">
                                    No offers found.
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => (
                                <tr key={row.id || rowIndex} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className="px-6 py-4">
                                            {col.render ? col.render(row) : (
                                                col.accessor === 'status' ? <StatusPill status={row[col.accessor]} /> :
                                                    col.accessor === 'amount' ? <span className="text-sm font-extrabold text-slate-900 dark:text-white">{formatCurrency(row[col.accessor])}</span> :
                                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{row[col.accessor]}</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardTable;
