import React, { useContext } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import AuthContext from '../contexts/AuthContext';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import Profile from '../components/Profile';
import GetProduct from '../components/ProductDetail'
import Cart from '../components/Cart';

const commonRoutes = [
    { index: true, element: <Login /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/home', element: <Home /> },
    { path: '/profile', element: <Profile /> },
    { path: `/product/*`, element: <GetProduct/> },
    { path: `/cart/*`, element: <Cart/> },
    { path: '*', element: <h3> PAGE NOT FOUND</h3> }
];

const userRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Outlet />,
        children: commonRoutes
    }
]);

const adminRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Outlet />,
        children: [
            ...commonRoutes,
            { path: '/dashboard', element: <Dashboard /> }
        ]
    }
]);

export default function AppRouter() {
    const { user } = useContext(AuthContext);
    const finalRouter = user?.role === 'ADMIN' ? adminRoutes : userRoutes;

    return (
        <RouterProvider router={finalRouter} />
    );
}
