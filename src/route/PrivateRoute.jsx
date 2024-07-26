import { Outlet, Navigate } from 'react-router-dom';
const PrivateRoute = ({ element, ...rest }) => {
    const token = localStorage.getItem('token');
    return (
        token ? <Outlet /> : <Navigate to='/' />
    )
};

export default PrivateRoute;
