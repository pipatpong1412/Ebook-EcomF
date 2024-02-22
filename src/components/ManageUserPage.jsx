import React, { useContext, useState } from 'react'
import UserContext, { UserContextProvider } from '../contexts/userContext'

export default function ManageUserPage() {
    const { user } = useContext(UserContext)

    return (
        <div className="bg-gray-200 max-h-fit rounded-lg p-6 shadow-md relative">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Manage User</h1>
            </div>
            <div>
                {user && user.map(el => (
                    <UserList key={el.id} user={el} />
                ))}
            </div>
        </div>
    )
}


function UserList({ user }) {

    const { deleteUser } = useContext(UserContext)
    const [isUpdateRole, setIsUpdateRole] = useState(false)

    const hdlDelete = () => {
        deleteUser(user.id)
    }

    const toggleUpdateRole = () => {
        setIsUpdateRole(!isUpdateRole)
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
                        <i onClick={toggleUpdateRole} className="fa-regular fa-pen-to-square hover:text-blue-300 cursor-pointer"></i>
                        <i onClick={hdlDelete} className="fa-solid fa-trash hover:text-red-600 cursor-pointer"></i>
                    </div>
                </div>
            </div>
            {isUpdateRole && <FormEditRole user={user} onClose={toggleUpdateRole} />}
        </div>
    )
}

function FormEditRole({ user, onClose }) {

    const { updateUser } = useContext(UserContext)
    const [input, setInput] = useState({
        role: user.role
    })

    const hdlSubmit = (e) => {
        e.preventDefault()
        updateUser(user.id, input)
        onClose()
    }

    const hdlCancel = () => {
        setInput({
            role: user.role
        })
        onClose()
    }

    const onChange = (e) => {
        setInput(prev => ({ ...prev, role: e.target.value }));
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 shadow-lg border-regal-blue border-2 w-auto">
                <div className="flex justify-center items-center mb-6 relative">
                    <h1 className="text-2xl font-bold text-dark-blue">Edit User Role</h1>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 focus:outline-none absolute -top-7 -right-4">
                        <i className="fa-solid fa-x"></i>
                    </button>
                </div>
                <form onSubmit={hdlSubmit}>
                    <div className="mb-4">
                        <input readOnly name="name" value={user.name} type="text"
                            className="block w-full py-2.5 pl-3 pr-9 text-sm text-gray-500 rounded-xl border-2 border-regal-blue"
                        />
                    </div>
                    <div className="mb-4">
                        <input readOnly name="email" value={user.email} type="text"
                            className="block w-full py-2.5 pl-3 pr-9 text-sm text-gray-500 rounded-xl border-2 border-regal-blue"
                        />
                    </div>
                    <div className="mb-4">
                        <input readOnly name="phone" value={user.phone || ''} placeholder='Phone' type="text"
                            className="block w-full py-2.5 pl-3 pr-9 text-sm text-gray-500 rounded-xl border-2 border-regal-blue"
                        />
                    </div>
                    <div className="mb-4">
                        <select onChange={onChange} name='role' value={input.role} className="block w-full py-2.5 pl-3 pr-9 text-sm text-dark-blue rounded-xl border-2 border-regal-blue">
                            <option value="ADMIN">ADMIN</option>
                            <option value="USER">USER</option>
                        </select>
                    </div>
                    <div className="flex justify-center gap-2">
                        <button type="submit" className="bg-regal-blue text-white rounded-full px-4 py-2 hover:bg-blue-950 hover:text-white">Save</button>
                        <button onClick={hdlCancel} className="bg-white text-dark-blue rounded-full px-4 py-2 hover:bg-red-500 hover:text-white">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
