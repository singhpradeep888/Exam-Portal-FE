import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './useAuth';

const ProtectedRoute = ({ redirectTo = '/login' }) => {
    const { isAuthenticated, isVerified } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} />;
    }

    if (!isVerified) {
        return <Navigate to="/verify" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
