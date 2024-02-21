import React, { useContext } from 'react'
import Navbar from './Navbar'
import CartContext from '../contexts/CartContext'
import ProductContext from '../contexts/ProductContext'
import { Link, useNavigate } from 'react-router-dom'
import PaymentContext from '../contexts/PaymentContext'

export default function CartPage() {
    const { cart, loading } = useContext(CartContext)
    const { product } = useContext(ProductContext)

    if (loading) {
        return (
            <div>
                <Navbar />
                <p>loading...</p>
            </div>
        )
    }

    if (typeof cart !== 'object' || cart.length === 0) {
        return (
            <>
                <Navbar />
                <div className='h-screen flex item-center justify-center'>
                    <div className="bg-blue-50 h-screen rounded-lg p-6 shadow-md relative w-full items-center justify-center">
                        <div className="flex justify-center items-center flex-col mt-[5%]">
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
                    <div className="bg-blue-50 h-screen rounded-lg p-6 shadow-md relative w-full items-center justify-center">
                        <div className="flex justify-center items-center mt-[5%]">
                            <h1 className="text-2xl font-bold mb-4">CART</h1>
                        </div>
                        <div className='flex justify-center items-center flex-col'>
                            {product && cart?.map(el => (
                                <CartItem key={el.id} productInCart={el} product={product} />
                            ))}
                        </div>
                        {cart && product && <SummaryCartProduct cart={cart} product={product} />}
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

    const hdlDelProductInCart = (e) => {
        e.preventDefault()
        delProductInCart(productInCart.id)
    }

    return (
        <div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-[800px]">
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
        </div>
    )
}

function SummaryCartProduct({ cart, product }) {

    const navigate = useNavigate()
    const { createPayment } = useContext(PaymentContext)

    const cartId = cart.find(item => item.id).id
    // console.log(CartId);

    const totalPrice = cart?.reduce((acc, cartItem) => {
        const productInCart = product.find(item => item.id === cartItem.productId)
        return acc + productInCart.price
    }, 0)

    const totalQty = cart?.reduce((acc, cartItem) => {
        return acc + cartItem.quantity
    }, 0)

    const paymentData = {
        totalQuantity: totalQty,
        totalPrice,
        cartId
    }

    const hdlCreatePayment = () => {
        createPayment(paymentData)
        navigate('/payment')
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <p className='hover:text-white underline'><Link to='/home'>Continue Shopping</Link></p>
            <p>Total Items: {totalQty}</p>
            <div className='text-[25px] font-bold text-dark-blue'>
                <p>Total Price: <span className='text-green-500'>${totalPrice}</span></p>
            </div>
            <div onClick={hdlCreatePayment} className='w-[190px] bg-dark-blue h-12 items-center justify-center flex rounded-full cursor-pointer hover:bg-blue-400'>
                <button className='text-white text-xl'>Purchase</button>
            </div>
        </div>
    )

}
