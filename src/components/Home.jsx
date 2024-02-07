import React, { useContext } from 'react'
import Navbar from './Navbar'
import ProductContext, { ProductContextProvider } from "../contexts/ProductContext"
import CategoryContext, { CategoryContextProvider } from '../contexts/CategoryContext'

export default function Home() {
    return (
        <>
            <Navbar />
            <CategoryContextProvider>
                <ProductContextProvider>
                    <HomeProduct />
                </ProductContextProvider>
            </CategoryContextProvider>
        </>
    )
}

function HomeProduct() {
    const { product } = useContext(ProductContext)
    const { category } = useContext(CategoryContext)
    const rsCategory = category ? category.map(el => el) : []

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 w-1/2 mx-auto relative">
            {product && product.map(itemProduct => (
                <div key={itemProduct.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-regal-blue cursor-pointer">
                    <img src={itemProduct.img} alt={itemProduct.name} className="w-full h-64 object-cover" />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2">{itemProduct.name}</h2>
                        <p className="text-gray-600 mb-2"><span className="font-semibold">Author: </span>{itemProduct.author}</p>
                        {itemProduct.name.length < 20 && rsCategory.find(cat => cat.id === itemProduct.categoryId) &&
                            <p className="text-gray-600 mb-2"><span className="font-semibold">Category: </span>{rsCategory.find(cat => cat.id === itemProduct.categoryId).name}</p>
                        }
                        <button className="rounded-lg w-full bg-regal-blue text-white py-2 hover:bg-blue-500">${itemProduct.price}</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
