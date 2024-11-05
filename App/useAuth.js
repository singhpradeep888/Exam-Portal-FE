import { useState } from 'react';

const useAuth = () => {
    const AUTH_STATUS_KEY = 'authenticated';
    const VERIFICATION_STATUS_KEY = 'verified';
    const ROLE_STATUS_KEY = 'userRole';

    // For Authentication
    const getAuthenticated = () => {
        const isAuthenticated = sessionStorage.getItem(AUTH_STATUS_KEY);
        return isAuthenticated === 'true';
    };

    const [isAuthenticated, setAuthenticated] = useState(getAuthenticated());

    const saveAuthenticated = (isAuthenticated) => {
        sessionStorage.setItem(AUTH_STATUS_KEY, isAuthenticated);
        setAuthenticated(isAuthenticated);
    };

    // For Email Verified user
    const getVerified = () => {
        const isVerified = sessionStorage.getItem(VERIFICATION_STATUS_KEY);
        return isVerified === 'true';
    };

    const [isVerified, setVerified] = useState(getVerified());

    const saveVerified = (isVerified) => {
        sessionStorage.setItem(VERIFICATION_STATUS_KEY, isVerified);
        setVerified(isVerified);
    };

    // For User Role
    const getRole = () => {
        return sessionStorage.getItem(ROLE_STATUS_KEY);
    };

    const [role, setRole] = useState(getRole());

    const saveRole = (role) => {
        sessionStorage.setItem(ROLE_STATUS_KEY, role);
        setRole(role);
    };

    return {
        isAuthenticated: isAuthenticated,
        isVerified: isVerified,
        role: role,
        setAuthenticated: saveAuthenticated,
        setVerified: saveVerified,
        setRole: saveRole,
    };
};

export default useAuth;
