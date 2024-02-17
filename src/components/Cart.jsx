import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import CartContext from '../contexts/CartContext'
import ProductContext from '../contexts/ProductContext'
import { Link } from 'react-router-dom'

export default function CartPage() {
    const { data, loading } = useContext(CartContext)
    const { product } = useContext(ProductContext)

    if (loading) {
        return (
            <div>
                <Navbar />
                <p>loading...</p>
            </div>
        )
    }

    if (typeof data !== 'object' || data.length === 0) {
        return (
            <>
                <Navbar />
                <div className='h-screen flex item-center justify-center'>
                    <div className="bg-blue-200 h-screen rounded-lg p-6 shadow-md relative w-full items-center justify-center">
                        <div className="flex justify-center items-center flex-col">
                            <h1 className="text-2xl font-bold mb-4">No Product in Cart</h1>
                            <h3 className='hover:text-white underline'><Link to='/home'>Continue Shopping</Link></h3>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <Navbar />
                <div className='h-screen flex items-center justify-center'>
                    <div className="bg-blue-200 h-screen rounded-lg p-6 shadow-md relative w-full items-center justify-center">
                        <div className="flex justify-center items-center">
                            <h1 className="text-2xl font-bold mb-4">CART</h1>
                        </div>
                        <div>
                            {product && data?.map(el => (
                                <CartItem key={el.id} productInCart={el} product={product} />
                            ))}
                        </div>
                        <SummaryCartProduct data={data} product={product} />
                    </div>
                </div>
            </>
        )
    }
}


function CartItem({ productInCart, product }) {
    const cartProduct = product?.find(item => item.id === productInCart.productId)
    const { name, price, img } = cartProduct
    const { delProductInCart, } = useContext(CartContext)
    const [updateCart, setUpdateCart] = useState(false)

    const hdlDelProductInCart = (e) => {
        e.preventDefault()
        delProductInCart(productInCart.productId)
        setUpdateCart(!updateCart)
    }

    return (
        <div>
            {!updateCart && (
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <div className='flex items-center justify-between mx-2'>
                        <div className='flex items-center'>
                            <img src={img} alt={name} className="w-auto h-20 object-cover mr-4" />
                            <div className='flex flex-col'>
                                <h2 className="text-lg font-semibold">{name}</h2>
                                <h3 className="text-lg font-semibold text-green-600">${price}</h3>
                            </div>
                        </div>
                        <div className="flex gap-3 text-lg text-dark-blue">
                            <i onClick={hdlDelProductInCart} className="fa-solid fa-trash hover:text-red-600 cursor-pointer"></i>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function SummaryCartProduct({ data, product }) {

    if (data && product) {
        const totalPrice = data?.reduce((acc, cartItem) => {
            const productInCart = product.find(item => item.id === cartItem.productId)
            return acc + productInCart.price
        }, 0)

        const totalQty = data?.reduce((acc, cartItem) => {
            return acc + cartItem.quantity
        }, 0)

        return (
            <div className='flex flex-col items-center justify-center'>
                <p className='hover:text-white underline'><Link to='/home'>Continue Shopping</Link></p>
                <p>Total Price: ${totalPrice}</p>
                <p>Total Items: {totalQty}</p>
            </div>
        )
    }
}
