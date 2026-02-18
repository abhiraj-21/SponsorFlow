import React from 'react';
import clsx from 'clsx';

const StatusPill = ({ status }) => {
    const styles = {
        PENDING: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        ACCEPTED: 'bg-green-500/10 text-green-500 border-green-500/20',
        REJECTED: 'bg-red-500/10 text-red-500 border-red-500/20',
    };

    const dotStyles = {
        PENDING: 'bg-yellow-500',
        ACCEPTED: 'bg-green-500',
        REJECTED: 'bg-red-500',
    };

    const statusKey = status?.toUpperCase() || 'PENDING';

    return (
        <div className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border", styles[statusKey])}>
            <span className={clsx("size-1.5 rounded-full", dotStyles[statusKey])}></span>
            <span className="text-[10px] font-bold uppercase tracking-wider">{statusKey}</span>
        </div>
    );
};

export default StatusPill;
