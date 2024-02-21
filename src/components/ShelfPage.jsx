import React, { useContext } from 'react'
import ShelfContext from '../contexts/ShelfContext'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import CategoryContext from '../contexts/CategoryContext'
import ProductContext from '../contexts/ProductContext'

export default function ShelfPage() {

    const { shelfProduct, loading } = useContext(ShelfContext)
    const { category } = useContext(CategoryContext)
    const { product } = useContext(ProductContext)

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
        <>
            <Navbar />
            <div className="grid grid-cols-4 gap-6 mt-[4.5%] w-[950px] mx-auto relative pb-5">
                {shelfProduct && category && product && shelfProduct.map(book =>
                    <ShelfItem key={book.id} book={book} category={category} product={product} />
                )}
            </div>
        </>
    )
}

function ShelfItem({ book, category, product }) {
    const navigate = useNavigate()
    const toggleLinktoDetail = () => {
        navigate('/product/' + yourBook.id)
    }

    const yourBook = product?.find(cat => cat.id === book.productId)
    const findProduct = product?.find(cat => cat)
    const categoryName = category?.find(cat => cat.id === findProduct?.categoryId).name

    const titleLength = 35
    const productTitle = yourBook?.name.length > titleLength ? yourBook?.name.substring(0, titleLength) + '...' : yourBook?.name

    const categoryLength = 12
    const categoryTitle = categoryName?.length > categoryLength ? categoryName.substring(0, categoryLength) + '...' : categoryName

    const authorLength = 20
    const authorTitle = yourBook?.author.length > authorLength ? yourBook?.author.substring(0, authorLength) + '...' : yourBook?.author

    return (
        <div>
            <div onClick={toggleLinktoDetail} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-regal-blue cursor-pointer h-[470px]">
                <img src={yourBook.img} alt={yourBook.name} className="w-full h-[68%] object-cover" />
                <div className="flex flex-col p-4 relative">
                    {yourBook.name.length > 20 ? (
                        <h2 className="text-lg font-semibold mb-[2px]">{productTitle}</h2>
                    ) : (
                        <div>
                            <h2 className="text-lg font-semibold mb-[2px]">{yourBook.name}</h2>
                            <h2> </h2>
                        </div>
                    )}
                    <p className="text-gray-600 mb-[2px]"><span className="font-semibold">Author: </span>{authorTitle}</p>
                    <p className="text-gray-600 mb-[4px]"><span className="font-semibold">Category: </span>{categoryTitle}</p>
                    {/* <span className="rounded-full w-full items-center justify-center flex bg-regal-blue text-white py-2 hover:bg-blue-500">฿{yourBook.price}</span> */}
                </div>
            </div>
        </div>
    )
}
