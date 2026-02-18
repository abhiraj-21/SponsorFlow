import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async (userRole) => {
        try {
            const endpoint = userRole === 'BRAND' ? '/brand/me' : '/influencer/me';
            const res = await api.get(endpoint);
            setUser({ ...res.data, role: userRole });
        } catch (err) {
            console.error('Failed to fetch user profile:', err);
            setUser({ role: userRole });
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');

        if (storedToken && storedRole) {
            setToken(storedToken);
            setRole(storedRole);
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            fetchUserProfile(storedRole).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (newToken, newRole) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('role', newRole);
        setToken(newToken);
        setRole(newRole);
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        await fetchUserProfile(newRole);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setToken(null);
        setRole(null);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
    };

    const refreshUser = () => {
        if (role) fetchUserProfile(role);
    };

    const value = {
        user,
        role,
        token,
        login,
        logout,
        loading,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
