import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import CategoryContext from '../contexts/CategoryContext'
import CartContext from '../contexts/CartContext'

export default function ProductDetailPage() {
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
        <>
            <Navbar />
            <ProductDetail product={product} />
        </>
    )
}


function ProductDetail({ product }) {

    const { category } = useContext(CategoryContext)
    const { addProducttoCart, data, cartId } = useContext(CartContext)
    const [isAddtoCart, setIsAddtoCart] = useState(false)
    const [ProductInCart, setProductInCart] = useState(null)

    useEffect(() => {
        if (typeof data !== 'string') {
            const productInCart = data?.find(cat => cat.productId === product.id)
            setProductInCart(productInCart)
        }
    }, [data, product.id])

    const categoryName = category ? category.find(cat => cat.id === product.categoryId)?.name || '' : ''

    const hdlAddtoCart = () => {
        addProducttoCart(cartId, product.id)
        setIsAddtoCart(true)
    }

    useEffect(() => {
        if (ProductInCart) {
            setIsAddtoCart(true)
        } else {
            setIsAddtoCart(false)
        }
    }, [ProductInCart])

    return (
        <div className='flex justify-center items-center h-screen bg-blue-50'>
            <div className='w-[1280px] bg-white rounded-lg border-gray-500 shadow-md h-[70%] flex'>
                <div className='w-1/2 flex justify-center items-center'>
                    <img src={product.img} alt={product.name} className="w-64 h-auto object-cover" />
                </div>
                <div className='w-1/2 p-8 flex flex-col gap-3'>
                    <p className="text-2xl font-semibold text-dark-blue">{product.name}</p>
                    <p className="text-dark-blue">Author: {product.author}</p>
                    <p className="text-dark-blue">Category: <span>{categoryName}</span></p>
                    <p className="text-dark-blue">Publisher: {product.publisher}</p>
                    <p className="text-dark-blue">Detail: {product.detail}</p>
                    <p className="text-dark-blue">Price: <span className='text-green-400 font-bold text-2xl'>฿{product.price}</span></p>
                    <div className='flex gap-5'>
                        {isAddtoCart ?
                            (<button className='shadow-md  bg-gray-500 text-white w-[150px] h-14 rounded-full'>ADDED IN CART</button>)
                            :
                            (<button onClick={hdlAddtoCart} className='shadow-md hover:bg-blue-300 bg-regal-blue text-white w-[150px] h-14 rounded-full'>ADD TO CART</button>)}
                    </div>
                </div>
            </div>
        </div>
    )
}