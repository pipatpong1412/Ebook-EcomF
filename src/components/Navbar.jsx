import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import CartContext from '../contexts/CartContext'

export default function Navbar() {

    const { user, logout } = useContext(AuthContext)
    const { data } = useContext(CartContext)

    return (
        <div>
            {user && data && <NavContent user={user} logout={logout} data={data} />}
        </div>
    )

}

function NavContent({ user, logout, data }) {

    const navigate = useNavigate()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const countData = data.length.toString()

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const hdlLogout = () => {
        logout()
        navigate('/')
    }

    const hdlSearch = () => {
        alert('In Operation...')
    }

    const hdlCart = () => {
        navigate('/cart')
    }

    const hdlProfile = () => {
        navigate('/profile')
    }

    return (
        <div className=''>
            <div className="h-16 bg-regal-blue px-4 justify-between flex items-center w-full fixed top-0 z-50">
                <div className='text-white text-4xl'><Link to='/home'>eBooks</Link></div>
                <div className='relative w-1/3'>
                    <input onClick={hdlSearch} className='bg-white rounded-full h-11 w-full px-3 border-gray-300 pl-10' placeholder='Search...' />
                    <div className='absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div className='flex gap-5 text-2xl text-white cursor-pointer relative items-center justify-center'>
                    <div className='flex gap-5 items-center justify-center'>
                        {data && data.length > 0 ?
                            <div className="relative">
                                <i onClick={hdlCart} className="fa-solid fa-cart-shopping hover:text-dark-blue"></i>
                                <div className={`absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center`}>{countData}</div>
                            </div>
                            : <i onClick={hdlCart} className="fa-solid fa-cart-shopping hover:text-dark-blue"></i>}
                    </div>
                    <div className='border p-2 rounded-xl hover:bg-white hover:text-dark-blue'>
                        <i className="fa-solid fa-user" onClick={toggleDropdown}><span className='text-sm pl-3'>{user.name}</span></i>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-[15px] w-40 bg-white rounded-lg shadow-lg text-dark-blue text-xl z-10">
                                {user?.role === 'ADMIN' && (
                                    <div className='flex pl-2 items-center hover:bg-gray-100 rounded-t-lg'>
                                        <i className="fa-solid fa-crown"></i>
                                        <div className="py-2 px-4 cursor-pointer"><Link to='/dashboard'>Dashboard</Link></div>
                                    </div>
                                )}
                                <div className='flex pl-2 items-center hover:bg-gray-100 rounded-t-lg'>
                                    <i className="fa-solid fa-gear"></i>
                                    <div onClick={hdlProfile} className="py-2 px-4 cursor-pointer">Profile</div>
                                </div>
                                <div className='flex pl-2 items-center hover:bg-gray-100'>
                                    <i className="fa-solid fa-book-open"></i>
                                    <div className="py-2 px-4 cursor-pointer">My Shelf</div>
                                </div>
                                <div className='flex pl-2 items-center hover:bg-red-500 rounded-b-lg'>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                    <div onClick={hdlLogout} className="py-2 px-4 hover:text-white cursor-pointer">Logout</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
