import React from 'react'
import { ProductContextProvider } from '../contexts/ProductContext'

export default function ManageCatetoey() {
    return (
        <ProductContextProvider>
            <Category />
        </ProductContextProvider>
    )
}

function Category() {
    return (
        <div>
            Category
        </div>
    )
}
