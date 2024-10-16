import React, { useState } from 'react';

const useToken = () => {
    const getToken = () => {
        const token = sessionStorage.getItem('authenticated');
        return token === 'true';
    };

    const [token, setToken] = useState(getToken());

    const saveToken = isAuthenticated => {
        sessionStorage.setItem('authenticated', isAuthenticated);
        setToken(isAuthenticated);
    }

    return {
        setToken: saveToken,
        token
    }
};

export default useToken;