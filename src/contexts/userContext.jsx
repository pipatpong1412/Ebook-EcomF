import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

const UserContext = createContext()

function UserContextProvider(props) {

    const [user, setUser] = useState(null)
    // const [trigger, setTrigger] = useState(false)

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

    }, [])

    return (
        <UserContext.Provider value={{ user }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext
export { UserContextProvider }