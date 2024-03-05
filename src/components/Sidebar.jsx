import React from 'react'

export default function Sidebar({ changeContent }) {

    const hdlClick = (text) => {
        changeContent(text)
    }

    return (
        <div className='w-72 h-[100dvh] bg-regal-blue'>
            <div className='text-white text-2xl p-4 mt-[30%]'>
                <h2 onClick={() => hdlClick("User")} className='p-2 border-gray-500 border rounded-lg mb-3 text-dark-blue bg-white text-center cursor-pointer hover:shadow-lg hover:text-white hover:bg-dark-blue'>Manage User</h2>
                <h2 onClick={() => hdlClick("Product")} className='p-2 border-gray-500 border rounded-lg mb-3 text-dark-blue bg-white text-center cursor-pointer hover:shadow-lg hover:text-white hover:bg-dark-blue'>Manage Product</h2>
                <h2 onClick={() => hdlClick("Category")} className='p-2 border-gray-500 border rounded-lg  text-dark-blue bg-white text-center cursor-pointer hover:shadow-lg hover:text-white hover:bg-dark-blue'>Manage Category</h2>
            </div>
        </div>
    )
}
