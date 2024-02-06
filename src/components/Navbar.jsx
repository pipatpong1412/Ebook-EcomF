import React, { useContext, useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()
    const { user, logout } = useContext(AuthContext)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const hdlLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className="h-16 bg-regal-blue px-4 justify-between flex items-center relative">
            <div className='text-white text-4xl'>eBooks</div>
            <div className='relative w-1/3'>
                <input className='bg-white rounded-full h-11 w-full px-3 border-gray-300 pl-10' placeholder='Search...' />
                <div className='absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
            <div className='flex gap-5 text-2xl text-white cursor-pointer relative'>
                <i className="fa-solid fa-cart-shopping  hover:text-gray-500"></i>
                <i className="fa-solid fa-user hover:text-gray-500" onClick={toggleDropdown}></i>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-11 w-40 bg-white rounded-lg shadow-lg text-dark-blue text-xl">
                        <div className='flex pl-2 items-center hover:bg-gray-100 rounded-t-lg'>
                            <i className="fa-solid fa-gear"></i>
                            <div className="py-2 px-4 cursor-pointer">Profile</div>
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
                <div className='cursor-default'>
                    <span>{user?.id ? user.name : 'Guest'}</span>
                </div>
            </div>
        </div>

    )
}
