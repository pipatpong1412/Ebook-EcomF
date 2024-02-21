import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import PaymentContext from '../contexts/PaymentContext'
import { useNavigate } from 'react-router-dom'
import ShelfContext from '../contexts/ShelfContext'
import CartContext from '../contexts/CartContext'
import Swal from 'sweetalert2'

export default function PaymentPage() {

    const { payment } = useContext(PaymentContext)
    const { cart } = useContext(CartContext)

    return (
        <>
            <Navbar />
            <div>
                {payment && cart && cart.map(el => (
                    <PaymentContent key={el.id} payment={payment} cart={el} />
                ))}
            </div>
        </>
    )
}

function PaymentContent({ payment, cart }) {

    const { purchasePayment } = useContext(PaymentContext)
    const { updateCartStatus } = useContext(CartContext)
    const { createShelf } = useContext(ShelfContext)
    const [method, setMethod] = useState('')
    const navigate = useNavigate()
    // console.log(cart)

    const handleChange = (e) => {
        setMethod(e.target.value)
    };

    const paymentData = {
        id: payment.id,
        method
    }

    const hdlConfirm = (e) => {
        e.preventDefault()
        if (paymentData.method !== '') {
            updateCartStatus(payment.cartId)
            purchasePayment(paymentData)
            createShelf(cart.productId)
            navigate('/home')
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please Select Payment Method",
                showConfirmButton: false,
                timer: 1500
            })
        }


    }

    // console.log(method);

    return (
        <div className='flex items-center justify-center bg-blue-50 h-screen'>
            <div className='text-dark-blue'>
                <div className='flex items-center justify-between gap-5'>
                    <div className='flex flex-col bg-white p-10 rounded-2xl gap-2 w-[400px] shadow-lg'>
                        <span className='text-2xl font-semibold text-regal-blue'>Payment Method</span>
                        <div className='flex gap-2 border-[1px] p-2 rounded-lg border-dark-blue mt-2'>
                            <input type="radio" name='method' value='Bank Account' onChange={handleChange} />
                            <span>Bank Account <i className="fa-solid fa-building-columns"></i></span>
                        </div>
                        <div className='flex gap-2 border-[1px] p-2 rounded-lg border-dark-blue items-center'>
                            <input type="radio" name='method' value='Debit Card / Credit Card' onChange={handleChange} />
                            <span>Debit Card / Credit Card <i className="fa-brands fa-cc-mastercard pr-1"></i>
                                <i className="fa-solid fa-credit-card pr-1"></i>
                                <i className="fa-brands fa-cc-visa"></i></span>
                        </div>
                        <div className='flex gap-2 border-[1px] p-2 rounded-lg border-dark-blue'>
                            <input type="radio" name='method' value='PayPal' onChange={handleChange} />
                            <span>PayPal <i className="fa-brands fa-paypal"></i></span>
                        </div>
                    </div>
                    <div className='flex flex-col bg-white p-10 rounded-2xl gap-4 w-[400px] h-[268px] shadow-lg'>
                        <span className='text-2xl font-semibold text-regal-blue'>Order Summary </span>
                        <div className='border-[1px] p-1 rounded-lg bg-blue-50'>
                            <p className='text-lg px-1'>Total Order : {payment.totalQuantity}</p>
                        </div>
                        <div>
                            <div className='flex flex-col gap-2 border-[1px] p-2 rounded-lg items-center bg-blue-50 -mt-2'>
                                <p className='text-red-600 text-lg font-semibold'>Total Price: ฿{payment.totalPrice}</p>
                                <button onClick={hdlConfirm} className='rounded-full bg-dark-blue w-[140px] h-[40px] text-white hover:bg-blue-400'>Purchase</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
