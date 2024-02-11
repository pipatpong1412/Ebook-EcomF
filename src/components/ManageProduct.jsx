import React, { useContext, useState } from 'react'
import ProductContext, { ProductContextProvider } from '../contexts/ProductContext'
import CategoryContext, { CategoryContextProvider } from '../contexts/CategoryContext'

export default function ManageProduct() {
    return (
        <CategoryContextProvider>
            <ProductContextProvider>
                <ProductDashboard />
            </ProductContextProvider>
        </CategoryContextProvider>
    )
}

function ProductDashboard() {

    const { product } = useContext(ProductContext)
    const [showForm, setShowForm] = useState(false)

    const toggleAddForm = () => {
        setShowForm(!showForm)
    }

    return (
        <div className="bg-gray-200 max-h-fit rounded-lg p-6 shadow-md relative">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Manage Product</h1>
                <div className="shadow-md rounded-full h-10 w-10 bg-white text-2xl justify-center items-center flex hover:bg-dark-blue hover:text-white mb-3 cursor-pointer" onClick={toggleAddForm}>
                    <i className="fa-solid fa-plus"></i>
                </div>
            </div>
            <div>
                {product?.map((item) => (
                    <ProductItem key={item.id} product={item} />
                ))
                }
            </div>
            {showForm && <FormAddProduct onClose={toggleAddForm} />}
        </div>
    )
}


function ProductItem({ product }) {

    const { deleteProduct } = useContext(ProductContext)
    const [isUpdateProduct, setIsUpdateProduct] = useState(false)

    const toggleUpdateForm = () => {
        setIsUpdateProduct(!isUpdateProduct);
    }

    const hdlDelete = () => {
        deleteProduct(product.id)
    }

    const cancelUpdate = () => {
        setIsUpdateProduct(false)
    }

    return (
        <div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                {!isUpdateProduct ? (
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <img src={product.img} alt={product.name} className="w-auto h-20 object-cover mr-4" />
                            <div className='flex flex-col'>
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <h3 className="text-sm font-semibold">${product.price}</h3>
                            </div>
                        </div>
                        <div className="flex gap-3 text-lg text-dark-blue">
                            <i onClick={toggleUpdateForm} className="fa-regular fa-pen-to-square hover:text-blue-300 cursor-pointer"></i>
                            <i onClick={hdlDelete} className="fa-solid fa-trash hover:text-red-600 cursor-pointer"></i>
                        </div>
                    </div>
                ) : (
                    <FormEditProduct product={product} onClose={cancelUpdate} />
                )}
            </div>
        </div>
    )
}

function FormAddProduct({ onClose }) {

    const { category } = useContext(CategoryContext)
    const { createProduct } = useContext(ProductContext)

    const [input, setInput] = useState({
        name: '',
        img: '',
        detail: '',
        price: '',
        author: '',
        publisher: '',
        categoryId: ''
    })


    const hdlChange = (e) => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = (e) => {
        e.preventDefault()
        createProduct(input)
        onClose()
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 shadow-lg border-regal-blue border-2 w-1/3">
                <div className="flex justify-center items-center mb-6 relative">
                    <h1 className="text-2xl font-bold text-dark-blue">Add Product</h1>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 focus:outline-none absolute -top-7 -right-4">
                        <i className="fa-solid fa-x"></i>
                    </button>
                </div>
                <form onSubmit={hdlSubmit}>
                    <div className="mb-4">
                        <input name="name" value={input.name} onChange={hdlChange} placeholder="Name" type="text"
                            className="block w-full py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue"
                        />
                    </div>
                    <div className="mb-4">
                        <input name="img" value={input.img} onChange={hdlChange} placeholder="Cover Image URL" type="text"
                            className="block w-full py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue"
                        />
                    </div>
                    <div className="mb-4">
                        <textarea className="block w-full py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue" name="detail" value={input.detail} onChange={hdlChange} rows="2" cols="32" placeholder='Detail'></textarea>
                    </div>
                    <div className="mb-4">
                        <input name="price" value={input.price} onChange={hdlChange} placeholder="Price" type="number"
                            className="block w-full py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue"
                        />
                    </div>
                    <div className="mb-4">
                        <input name="author" value={input.author} onChange={hdlChange} placeholder="Author" type="text"
                            className="block w-full py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue"
                        />
                    </div>
                    <div className="mb-4">
                        <input name="publisher" value={input.publisher} onChange={hdlChange} placeholder="Publisher" type="text"
                            className="block w-full py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue"
                        />
                    </div>
                    <div className="mb-4">
                        <select required name="categoryId" value={input.categoryId} onChange={hdlChange} className="block w-full py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue">
                            <option value="" disabled>Select Category</option>
                            {category.map(el => (
                                <option key={el.id} value={el.id}>{el.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-regal-blue text-white rounded-lg px-4 py-2 hover:bg-blue-950 hover:text-white">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function FormEditProduct({ product, onClose }) {

    const { updateProduct } = useContext(ProductContext)
    const { category } = useContext(CategoryContext)
    const [input, setInput] = useState({
        name: product.name,
        img: product.img,
        detail: product.detail,
        price: product.price,
        author: product.author,
        publisher: product.publisher,
        categoryId: product.categoryId
    })

    const hdlChange = (e) => {
        setInput(prevInput => ({ ...prevInput, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = (e) => {
        e.preventDefault()
        updateProduct(product.id, input)
        onClose()
    }

    const hdlCancel = () => {
        setInput({...input})
        onClose()
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 shadow-lg border-regal-blue border-2 w-1/3">
                <div className="flex justify-center items-center mb-6 relative">
                    <h1 className="text-2xl font-bold text-dark-blue">Edit Product</h1>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 focus:outline-none absolute -top-7 -right-4">
                        <i className="fa-solid fa-x"></i>
                    </button>
                </div>
                <form onSubmit={hdlSubmit}>
                    <div className="mb-4">
                        <input name="name" value={input.name} onChange={hdlChange} placeholder="Name" type="text"
                            className="block w-full py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue"
                        />
                    </div>
                    <div className="mb-4">
                        <input name="img" value={input.img} onChange={hdlChange} placeholder="Cover Image URL" type="text"
                            className="block w-full py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue"
                        />
                    </div>
                    <div className="mb-4">
                        <textarea className="block w-full py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue" name="detail" value={input.detail} onChange={hdlChange} rows="2" cols="32" placeholder='Detail'></textarea>
                    </div>
                    <div className="mb-4">
                        <input name="price" value={input.price} onChange={hdlChange} placeholder="Price" type="number"
                            className="block w-full py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue"
                        />
                    </div>
                    <div className="mb-4">
                        <input name="author" value={input.author} onChange={hdlChange} placeholder="Author" type="text"
                            className="block w-full py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue"
                        />
                    </div>
                    <div className="mb-4">
                        <input name="publisher" value={input.publisher} onChange={hdlChange} placeholder="Publisher" type="text"
                            className="block w-full py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue"
                        />
                    </div>
                    <div className="mb-4">
                        <select required name="categoryId" value={input.categoryId} onChange={hdlChange} className="block w-full py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue">
                            <option value="" disabled>Select Category</option>
                            {category.map(el => (
                                <option key={el.id} value={el.id}>{el.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-center gap-2">
                        <button type="submit" className="bg-regal-blue text-white rounded-full px-4 py-2 hover:bg-blue-950 hover:text-white">Save</button>
                        <button onClick={hdlCancel} className="bg-white text-dark-blue rounded-full px-4 py-2 hover:bg-red-500 hover:text-white">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}