import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

const UserContext = createContext()

function UserContextProvider(props) {

    const [user, setUser] = useState(null)
    const [trigger, setTrigger] = useState(false)

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/auth/user/del/${userId}`)
                .then(res => setTrigger(prv => !prv))
            alert('Delete User Successfully')

        } catch (error) {
            alert(error.message)
        }
    }

    const updateUser = async (userId, userRole) => {
        try {
            await axios.patch(`http://localhost:8000/auth/user/patch/${userId}`, userRole)
                .then(res => setTrigger(prv => !prv))
            alert('Update Role Successfully')

        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const rs = await axios.get('http://localhost:8000/auth/user/')
                setUser(rs.data)

            } catch (error) {
                alert(error.message)
            }
        }

        getUser()

    }, [trigger])

    return (
        <UserContext.Provider value={{ user, deleteUser, updateUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext
export { UserContextProvider }