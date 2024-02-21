import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const UserContext = createContext()

function UserContextProvider(props) {

    const [user, setUser] = useState(null)
    const [trigger, setTrigger] = useState(false)

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/auth/user/del/${userId}`)
                .then(res => setTrigger(prv => !prv))
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Delete User Successfully",
                showConfirmButton: false,
                timer: 1500
            })

        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const updateUser = async (userId, role) => {
        try {
            await axios.patch(`http://localhost:8000/auth/user/patch/role/${userId}`, role)
                .then(res => setTrigger(prv => !prv))
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Update Role Successfully",
                showConfirmButton: false,
                timer: 1500
            })

        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const rs = await axios.get('http://localhost:8000/auth/user/')
                setUser(rs.data)

            } catch (error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${error.response.data.message}`,
                    showConfirmButton: false,
                    timer: 1500
                })
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