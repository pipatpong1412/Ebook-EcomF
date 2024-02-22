import React, { useContext } from 'react'
import Navbar from './Navbar'
import ProductContext from "../contexts/ProductContext"
import CategoryContext from '../contexts/CategoryContext'
import { useNavigate } from 'react-router-dom'
import SearchContext from '../contexts/SearchContext'

export default function SearchHomePage() {
    const { productSearch } = useContext(SearchContext)
    // const { product } = useContext(ProductContext)
    const { category } = useContext(CategoryContext)

    // console.log(productSearch)

    return (
        <>
            <Navbar />
            <div className="grid grid-cols-4 gap-6 mt-[4.5%] w-[950px] mx-auto relative pb-5">
                {productSearch && productSearch.map(item => (
                    <HomeItem key={item.id} productSearch={item} category={category} />
                ))}
            </div>
        </>
    )
}

function HomeItem({ productSearch, category }) {

    const navigate = useNavigate()
    const toggleLinktoDetail = () => {
        navigate('/product/' + productSearch.id)
    }

    const categoryName = category?.find(cat => cat.id === productSearch?.categoryId).name

    const titleLength = 35
    const productTitle = productSearch?.name.length > titleLength ? productSearch?.name.substring(0, titleLength) + '...' : productSearch?.name

    const categoryLength = 12
    const categoryTitle = categoryName?.length > categoryLength ? categoryName.substring(0, categoryLength) + '...' : categoryName

    const authorLength = 20
    const authorTitle = productSearch?.author.length > authorLength ? productSearch?.author.substring(0, authorLength) + '...' : productSearch?.author

    return (
        <div>
            <div onClick={toggleLinktoDetail} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-regal-blue cursor-pointer h-[470px]">
                <img src={productSearch.img} alt={productSearch.name} className="w-full h-[62%] object-cover" />
                <div className="flex flex-col p-4 relative">
                    {productSearch.name.length > 20 ? (
                        <h2 className="text-lg font-semibold mb-[2px]">{productTitle}</h2>
                    ) : (
                        <div>
                            <h2 className="text-lg font-semibold mb-[2px]">{productSearch.name}</h2>
                            <h2> </h2>
                        </div>
                    )}
                    <p className="text-gray-600 mb-[2px]"><span className="font-semibold">Author: </span>{authorTitle}</p>
                    <p className="text-gray-600 mb-[4px]"><span className="font-semibold">Category: </span>{categoryTitle}</p>
                    <span className="rounded-full w-full items-center justify-center flex bg-regal-blue text-white py-2 hover:bg-blue-500">฿{productSearch.price}</span>
                </div>
            </div>
        </div>
    )
}


// const filterProduct = product?.reduce((a, c) => {
//     if ((c.name.toLowerCase().includes(filterText.toLowerCase().trim()))) {return a}
//     a.output.push(<HomeItem key={c.id} product={c} category={category} />)
// },{ output: []})