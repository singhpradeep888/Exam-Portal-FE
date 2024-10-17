import { useState } from 'react';

const useAuth = () => {
    // For Authentication
    const getAuthenticated = () => {
        const isAuthenticated = sessionStorage.getItem('authenticated');
        return isAuthenticated === 'true';
    };

    const [isAuthenticated, setAuthenticated] = useState(getAuthenticated());

    const saveAuthenticated = (isAuthenticated) => {
        sessionStorage.setItem('authenticated', isAuthenticated);
        setAuthenticated(isAuthenticated);
    };

    // For Email Verified user
    const getVerified = () => {
        const isVerified = sessionStorage.getItem('verified');
        return isVerified === 'true';
    };

    const [isVerified, setVerified] = useState(getVerified());

    const saveVerified = (isVerified) => {
        sessionStorage.setItem('verified', isVerified);
        setVerified(isVerified);
    }

    return {
        isAuthenticated: isAuthenticated,
        isVerified: isVerified,
        setAuthenticated: saveAuthenticated,
        setVerified: saveVerified,
    };
};

export default useAuth;
