import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'


const AuthContext = createContext()

function AuthContextProvider(props) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getMe = async () => {
            try {
                setLoading(true)
                let token = localStorage.getItem('token')
                if (!token) { return }
                const rs = await axios.get('http://localhost:8000/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setUser(rs.data)
            } catch (error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${error.response.data.message}`,
                    showConfirmButton: false,
                    timer: 1500
                })


            } finally {
                setLoading(false)
            }
        }
        getMe()
    }, [])

    const updateProfile = async (userId, data) => {
        try {
            await axios.patch(`http://localhost:8000/auth/user/patch/profile/${userId}`, data)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Update Profile Successfully",
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

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
    }


    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout, updateProfile }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
export { AuthContextProvider }
