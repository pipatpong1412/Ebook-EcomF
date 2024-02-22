import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import CartContext from '../contexts/CartContext'
import SearchContext from '../contexts/SearchContext'

export default function Navbar() {

    const { user, logout } = useContext(AuthContext)
    const { cart } = useContext(CartContext)

    return (
        <div>
            {user && cart && <NavContent user={user} logout={logout} cart={cart} />}
        </div>
    )

}

function NavContent({ user, logout, cart }) {
    const navigate = useNavigate()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { setSearch, search, run } = useContext(SearchContext)
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const countData = cart.length.toString()

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const hdlLogout = () => {
        logout()
        navigate('/')
    }

    const hdlCart = () => {
        navigate('/cart')
    }

    const hdlShelf = () => {
        navigate('/shelf')
    }

    const hdlProfile = () => {
        navigate('/profile')
    }

    const hdlChange = (e) => {
        setSearch(e.target.value)
    }

    const hdlSearch = (e) => {
        e.preventDefault()
        run()
        navigate('/home/search'+ `?product=${search}`)
        setSearch('')
    }

    return (
        <div className=''>
            <div className="h-16 bg-regal-blue px-4 justify-between flex items-center w-full fixed top-0 z-50">
                <div className='text-white text-4xl'><Link to='/home'>EBookS</Link></div>
                <form onSubmit={hdlSearch} className='relative w-1/3'>
                    <input onChange={hdlChange} value={search.trim()} type='text' className='bg-white rounded-full h-11 w-full px-3 border-gray-300 pl-10' placeholder='Search...' />
                    <div className='absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </form>
                <div className='flex gap-5 text-2xl text-white cursor-pointer relative items-center justify-center'>
                    <div className='flex gap-5 items-center justify-center'>
                        {cart && cart.length > 0 ?
                            <div className="relative">
                                <i onClick={hdlCart} className="fa-solid fa-cart-shopping hover:text-dark-blue"></i>
                                <div className={`absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center`}>{countData}</div>
                            </div>
                            : <i onClick={hdlCart} className="fa-solid fa-cart-shopping hover:text-dark-blue"></i>}
                    </div>
                    <div className='border p-2 rounded-xl hover:bg-white hover:text-dark-blue'>
                        <i className="fa-solid fa-user" onClick={toggleDropdown}><span className='text-sm pl-3'>{user.name}</span></i>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-[15px] w-40 bg-white rounded-lg shadow-lg text-dark-blue text-xl z-10" ref={dropdownRef}>
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
                                    <div onClick={hdlShelf} className="py-2 px-4 cursor-pointer">My Shelf</div>
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
