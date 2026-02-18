import React from 'react';
import { useAuth } from '../../context/AuthContext';
import BrandDashboard from './BrandDashboard';
import InfluencerDashboard from './InfluencerDashboard';

const Dashboard = () => {
    const { role } = useAuth();

    if (role === 'BRAND') {
        return <BrandDashboard />;
    }

    if (role === 'INFLUENCER') {
        return <InfluencerDashboard />;
    }

    return null; // Should not happen due to protected route
};

export default Dashboard;
