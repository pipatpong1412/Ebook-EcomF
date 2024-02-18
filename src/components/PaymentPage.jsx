import React from 'react'
import Navbar from './Navbar'

export default function PaymentPage() {
    return (
        <>
            <Navbar />
            <PaymentContent />
        </>
    )
}

function PaymentContent() {
    return (
        <div className='flex items-center justify-center bg-blue-50 h-screen'>
            <div className='text-dark-blue'>
                <div className='flex items-center justify-between gap-5'>
                    <div className='flex flex-col bg-white p-10 rounded-2xl gap-2 w-[400px] shadow-lg'>
                        <span className='text-2xl font-semibold text-regal-blue'>Payment Method</span>
                        <div className='flex gap-2 border-[1px] p-2 rounded-lg border-dark-blue mt-2 '>
                            <input type="checkbox" />
                            <span>Bank Account <i class="fa-solid fa-building-columns"></i></span>
                        </div>
                        <div className='flex gap-2 border-[1px] p-2 rounded-lg border-dark-blue items-center'>
                            <input type="checkbox"/>
                            <span>Debit Card / Credit Card <i class="fa-brands fa-cc-mastercard"></i> <i class="fa-solid fa-credit-card"></i> <i class="fa-brands fa-cc-visa"></i></span>
                        </div>
                        <div className='flex gap-2 border-[1px] p-2 rounded-lg border-dark-blue'>
                            <input type="checkbox" />
                            <span>PayPal <i class="fa-brands fa-paypal"></i></span>
                        </div>
                    </div>
                    <div className='flex flex-col bg-white p-10 rounded-2xl gap-4 w-[400px] h-[268px] shadow-lg'>
                        <span className='text-2xl font-semibold text-regal-blue'>Order Summary </span>
                        <div className='border-[1px] p-1 rounded-lg bg-blue-50'>
                            <p className='text-lg px-1'>Total Order : 1</p>
                        </div>
                        <div>
                            <div className='flex flex-col gap-2 border-[1px] p-2 rounded-lg items-center bg-blue-50 -mt-2'>
                                <p className='text-red-600 text-lg font-semibold'>Total Price: ฿250</p>
                                <button className='rounded-full bg-dark-blue w-[140px] h-[40px] text-white hover:bg-blue-400'>Purchase</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
