import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext';

const PrivateRoutes = () => {
    const {user} = useAuth; // Replace with your authentication logic

    return user ? <Outlet/> : <Navigate to="/login"/>
}


export default PrivateRoutes;