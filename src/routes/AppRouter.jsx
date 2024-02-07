import React, { useContext } from 'react'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import AuthContext from '../contexts/AuthContext'
import Home from '../components/Home'
import Dashboard from '../components/Dashboard'

const userRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Outlet />
        </>,
        children: [
            { index: true, element: <Login /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/home', element: <Home /> },
            { path: '*', element: <h3> PAGE NOT FOUND</h3> }
        ]
    }
])

const adminRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Outlet />
        </>,
        children: [
            { index: true, element: <Login /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/home', element: <Home /> },
            { path: '/dashboard', element: <Dashboard /> },
            { path: '*', element: <h3> PAGE NOT FOUND</h3> }
        ]
    }
])

export default function AppRouter() {

    const { user } = useContext(AuthContext)
    const finalRouter = user?.role === 'ADMIN' ? adminRouter : userRouter

    return (
        <RouterProvider router={finalRouter} />
    )
}
