import React from 'react'
import { ProductContextProvider } from '../contexts/ProductContext'

export default function ManageProduct() {
    return (
        <ProductContextProvider>
            <Product/>
        </ProductContextProvider>
    )
}

function Product() {
    return (
        <div>
            Product
        </div>
    )
}
