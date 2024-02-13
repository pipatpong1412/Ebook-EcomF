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

    return (
        <div className="grid grid-cols-4 gap-6 mt-5 w-[950px] mx-auto relative pb-5">
            {product?.map(item => (
                <HomeItem key={item.id} product={item} category={category} />
            ))}
        </div>
    )
}

function HomeItem({ product, category }) {

    const navigate = useNavigate()
    const toggleLinktoDetail = () => {
        navigate('/product/' + product.id)
    }

    const categoryName = category.find(cat => cat.id === product.categoryId).name

    const titleLength = 30
    const productTitle = product.name.length > titleLength ? product.name.substring(0, titleLength) + '...' : product.name

    const categoryLength = 12
    const categoryTitle = categoryName.length > categoryLength ? categoryName.substring(0, categoryLength) + '...' : categoryName

    const authorLength = 20
    const authorTitle = product.author.length > authorLength ? product.author.substring(0, authorLength) + '...' : product.author

    return (
        <div>
            <div onClick={toggleLinktoDetail} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-regal-blue cursor-pointer h-[470px]">
                <img src={product.img} alt={product.name} className="w-full h-[62%] object-cover" />
                <div className="flex flex-col p-4 relative">
                    {product.name.length > 20 ? (
                        <h2 className="text-lg font-semibold mb-[2px]">{productTitle}</h2>
                    ) : (
                        <div>
                            <h2 className="text-lg font-semibold mb-[2px]">{product.name}</h2>
                            <br />
                        </div>
                    )}
                    <p className="text-gray-600 mb-[2px]"><span className="font-semibold">Author: </span>{authorTitle}</p>
                    <p className="text-gray-600 mb-[4px]"><span className="font-semibold">Category: </span>{categoryTitle}</p>
                    <span className="rounded-full w-full items-center justify-center flex bg-regal-blue text-white py-2 hover:bg-blue-500">฿{product.price}</span>
                </div>
            </div>
        </div>
    )
}