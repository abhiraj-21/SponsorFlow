import React from 'react';

const PlaceholderPage = ({ title }) => {
    return (
        <div className="flex-1 p-8 text-slate-900 dark:text-white">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <div className="p-12 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex items-center justify-center text-slate-400">
                Feature coming soon
            </div>
        </div>
    );
};

export default PlaceholderPage;
