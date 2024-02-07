import React, { createContext } from 'react'

const userContext = createContext()

function userContextProvider(props) {
    return (
        <userContext.Provider value={{}}>
            {props.children}
        </userContext.Provider>
    )
}

export default userContext
export { userContextProvider }