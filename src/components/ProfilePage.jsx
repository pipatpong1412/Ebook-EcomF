import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import AuthContext from '../contexts/AuthContext'

export default function ProfilePage() {
    const { user, updateProfile } = useContext(AuthContext)

    return (
        <div>
            <Navbar />
            {user && <FormProfile user={user} updateProfile={updateProfile} />}
        </div>
    )
}


function FormProfile({ user, updateProfile }) {

    const [isEditProfile, setIsEditProfile] = useState(false)
    const [input, setInput] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone
    })

    const hdlCancel = () => {
        setInput({ ...input })
        setIsEditProfile(false)
    }

    const hdlChange = (e) => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = (e) => {
        e.preventDefault()
        updateProfile(user.id, input)
        setIsEditProfile(false)
    }

    const toggleEditProfile = (e) => {
        e.preventDefault()
        setIsEditProfile(!isEditProfile)
    }

    return (
        <div>
            {!isEditProfile ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border-regal-blue border-2 w-1/3">
                        <div className="flex justify-center items-center mb-6 relative">
                            <h1 className="text-2xl font-bold text-dark-blue">Profile</h1>
                        </div>
                        <form onSubmit={hdlSubmit}>
                            <div className="mb-4">
                                <input readOnly name="name" value={input.name} type="text"
                                    className="block w-full py-2.5 pl-3 pr-9 text-sm text-gray-500 rounded-xl border-2 border-regal-blue"
                                />
                            </div>
                            <div className="mb-4">
                                <input readOnly name="email" value={input.email} type="text"
                                    className="block w-full py-2.5 pl-3 pr-9 text-sm text-gray-500 rounded-xl border-2 border-regal-blue"
                                />
                            </div>
                            <div className="mb-4">
                                <input readOnly name="phone" value={input.phone || ''} placeholder='Phone' type="text"
                                    className="block w-full py-2.5 pl-3 pr-9 text-sm text-gray-500 rounded-xl border-2 border-regal-blue"
                                />
                            </div>
                            <div className="flex justify-center gap-2">
                                {/* <button type="submit" className="bg-regal-blue text-white rounded-full px-4 py-2 hover:bg-blue-950 hover:text-white">Save</button> */}
                                <button onClick={toggleEditProfile} className="bg-white text-dark-blue rounded-full px-4 py-2 hover:bg-red-500 hover:text-white">Edit</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border-regal-blue border-2 w-1/3">
                        <div className="flex justify-center items-center mb-6 relative">
                            <h1 className="text-2xl font-bold text-dark-blue">Edit Profile</h1>
                        </div>
                        <form onSubmit={hdlSubmit}>
                            <div className="mb-4">
                                <input onChange={hdlChange} name="name" value={input.name} type="text"
                                    className="block w-full py-2.5 pl-3 pr-9 text-sm text-dark-blue rounded-xl border-2 border-regal-blue"
                                />
                            </div>
                            <div className="mb-4">
                                <input readOnly onChange={hdlChange} name="email" value={input.email} type="text"
                                    className="block w-full py-2.5 pl-3 pr-9 text-sm text-gray-500 rounded-xl border-2 border-regal-blue"
                                />
                            </div>
                            <div className="mb-4">
                                <input onChange={hdlChange} name="phone" value={input.phone || ''} placeholder='Phone' type="text"
                                    className="block w-full py-2.5 pl-3 pr-9 text-sm text-dark-blue rounded-xl border-2 border-regal-blue"
                                />
                            </div>
                            <div className="flex justify-center gap-2">
                                <button type="submit" className="bg-regal-blue text-white rounded-full px-4 py-2 hover:bg-blue-950 hover:text-white">Save</button>
                                <button onClick={hdlCancel} className="bg-white text-dark-blue rounded-full px-4 py-2 hover:bg-red-500 hover:text-white">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
