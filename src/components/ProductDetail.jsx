import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import CategoryContext, { CategoryContextProvider } from '../contexts/CategoryContext'

export default function GetProduct() {
    const location = useLocation()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getProductById = async () => {
            try {
                const productId = location.pathname.split('/')[2]
                const rs = await axios.get(`http://localhost:8000/product/${productId}`)
                setProduct(rs.data)
                setLoading(!loading)

            } catch (error) {
                alert(error.message)
            } finally {
                setLoading(false)
            }
        }
        getProductById()

    }, [])

    if (loading) {
        return (
            <div>
                <Navbar />
                <h3>loading....</h3>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <CategoryContextProvider>
                <ProductDetail product={product} />
            </CategoryContextProvider>
        </div>
    )
}


function ProductDetail({ product }) {

    const { category } = useContext(CategoryContext)

    return (
        <div className='flex justify-center items-center h-screen bg-light-blue'>
            <div className='w-2/3 bg-white rounded-lg border-gray-500 shadow-md h-[80%] items-center justify-center flex flex-col -mt-14'>
                <div className='flex gap-8 justify-center items-center'>
                    <div>
                        <img src={product.img} alt={product.name} className="w-64 h-full object-cover" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className="text-4xl font-semibold my-2">{product.name}</p>
                        <p className="text-gray-700">Author: {product.author}</p>
                        {category && category.find(cate => cate.id === product.categoryId) &&
                            <p className="text-gray-700">Category: <span>{category.find(cate => cate.id === product.categoryId).name}</span></p>}
                        <p className="text-gray-700">Publisher: {product.publisher}</p>
                        <p className="text-gray-700">Detail: {product.detail}</p>
                        <p className="text-gray-700">Price: <span className='text-green-400'>฿{product.price}</span></p>
                        <div className='flex gap-5 mt-3'>
                            <button className='shadow-md hover:bg-blue-300 bg-green-300 text-white w-full h-14 rounded-full'>BUY ฿{product.price}</button>
                            <button className='shadow-md hover:bg-blue-300 bg-regal-blue text-white w-full h-14 rounded-full'>ADD TO CART</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}