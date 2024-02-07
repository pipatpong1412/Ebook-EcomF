import React, { useContext } from 'react'
import ProductContext, { ProductContextProvider } from '../contexts/ProductContext'

export default function ManageProduct() {
    return (
        <ProductContextProvider>
            <Product />
        </ProductContextProvider>
    )
}

function Product() {

    const { product } = useContext(ProductContext)

    return (
        <div className="bg-gray-200 max-h-fit rounded-lg p-6 shadow-md">
            <h1 className="text-2xl font-bold mb-4">Manage Product</h1>
            <div className="flex flex-col gap-4">
                {product?.map((itemProduct) => (
                    <div key={itemProduct.id} className="bg-white p-4 rounded-lg shadow-md flex items-center">
                        <img src={itemProduct.img} alt={itemProduct.name} className="w-auto h-20 object-cover mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold ">{itemProduct.name}</h2>
                            <h3 className="text-lg font-semibold text-gray-500">{itemProduct.author}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
