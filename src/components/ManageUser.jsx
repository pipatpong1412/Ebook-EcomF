import React, { useContext } from 'react'
import UserContext, { UserContextProvider } from '../contexts/userContext'

export default function ManageUser() {

    return (
        <UserContextProvider>
            <UserDashboard />
        </UserContextProvider>
    )
}

function UserDashboard() {

    const { user } = useContext(UserContext)

    return (
        <div className="bg-gray-200 max-h-fit rounded-lg p-6 shadow-md relative">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Manage User</h1>
            </div>
            <div>
                {user?.map(el => (
                    <UserList key={el.id} user={el} />
                ))}
            </div>
        </div>
    )
}


function UserList({ user }) {

    const { deleteUser } = useContext(UserContext)

    const hdlDelete = () => {
        deleteUser(user.id)
    }

    return (
        <div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className="text-lg font-semibold">Name: {user.name}</h2>
                        <h4>Role: {user.role}</h4>
                    </div>
                    <div className="flex gap-3 text-lg text-dark-blue">
                        <i className="fa-regular fa-pen-to-square hover:text-blue-300 cursor-pointer"></i>
                        <i onClick={hdlDelete} className="fa-solid fa-trash hover:text-red-600 cursor-pointer"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}