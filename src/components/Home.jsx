import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import ProductContext, { ProductContextProvider } from "../contexts/ProductContext"
import CategoryContext, { CategoryContextProvider } from '../contexts/CategoryContext'
import { useNavigate } from 'react-router-dom'

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
        <div className="grid grid-cols-4 gap-6 mt-5 w-1/2 mx-auto relative">
            {product?.map(item => (
                <HomeItem key={item.id} product={item} category={rsCategory} />
            ))}
        </div>
    )
}

function HomeItem({ product, category }) {

    const navigate = useNavigate()
    const toggleLinktoDetail = () => {
        navigate('/product/' + product.id)
    }

    return (
        <div>
            <div onClick={toggleLinktoDetail} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-regal-blue cursor-pointer">
                <img src={product.img} alt={product.name} className="w-full h-64 object-cover" />
                <div className="flex flex-col p-4 relative">
                    <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-2"><span className="font-semibold">Author: </span>{product.author}</p>
                    {product.name.trim().length < 20 && category.find(cat => cat.id === product.categoryId) &&
                        <p className="text-gray-600 mb-2"><span className="font-semibold">Category: </span>{category.find(cat => cat.id === product.categoryId).name}</p>
                    }
                    <span className="rounded-lg w-full items-center justify-center flex bg-regal-blue text-white py-2 hover:bg-blue-500">฿{product.price}</span>
                </div>
            </div>
        </div>
    )
}
