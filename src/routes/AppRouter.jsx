import React, { useContext } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import HomePage from '../components/HomePage';
import DashboardPage from '../components/DashboardPage';
import LoginPage from '../components/LoginPage';
import CartPage from '../components/CartPage';
import ProductDetailPage from '../components/ProductDetailPage';
import ProfilePage from '../components/ProfilePage';
import RegisterPage from '../components/RegisterPage';
import PaymentPage from '../components/PaymentPage';
import ShelfPage from '../components/ShelfPage';

const commonRoutes = [
    { index: true, element: <LoginPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/home', element: <HomePage /> },
    { path: '/profile', element: <ProfilePage /> },
    { path: `/product/*`, element: <ProductDetailPage/> },
    { path: `/cart/*`, element: <CartPage/> },
    { path: `/payment/*`, element: <PaymentPage/> },
    { path: `/shelf/*`, element: <ShelfPage/> },
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
            { path: '/dashboard', element: <DashboardPage /> }
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
