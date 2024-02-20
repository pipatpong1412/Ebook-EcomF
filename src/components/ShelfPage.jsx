import React, { useContext } from 'react'
import ShelfContext from '../contexts/ShelfContext'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

export default function ShelfPage() {

    const { shelfProduct, loading } = useContext(ShelfContext)

    if (loading) {
        return (
            <>
                <Navbar />
                <p>loading...</p>
            </>
        )
    }

    if (typeof shelfProduct !== 'object' || shelfProduct.length === 0) {
        return (
            <>
                <Navbar />
                <div className='h-screen flex item-center justify-center'>
                    <div className="bg-blue-50 h-screen rounded-lg p-6 shadow-md relative w-full items-center justify-center">
                        <div className="flex justify-center items-center flex-col mt-[5%]">
                            <h1 className="text-2xl font-bold mb-4">No Book in Shelf</h1>
                            <h3 className='hover:text-white underline'><Link to='/home'>Continue Shopping</Link></h3>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="grid grid-cols-4 gap-6 mt-[4.5%] w-[950px] mx-auto relative pb-5">
            {shelfProduct && shelfProduct.map(book => (
                <ShelfItem key={book.id} book={book} />
            ))}
        </div>
    )
}

function ShelfItem({ book }) {
    return (
        <div>
            TEST
        </div>
    )
}
