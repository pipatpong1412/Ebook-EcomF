import React from 'react'
import { ProductContextProvider } from '../contexts/ProductContext'

export default function ManageUser() {
    return (
        <ProductContextProvider>
            <User/>
        </ProductContextProvider>
    )
}

function User() {
    return (
        <div>
            User
        </div>
    )
}
