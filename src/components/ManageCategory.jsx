import React, { useContext, useState } from 'react'
import CategoryContext, { CategoryContextProvider } from '../contexts/CategoryContext'

export default function ManageCatetoey() {
    return (
        <CategoryContextProvider>
            <Category />
        </CategoryContextProvider>
    )
}


function Category() {
    const { getCategory } = useContext(CategoryContext)
    const [showForm, setShowForm] = useState(false)

    const toggleAddForm = () => {
        setShowForm(!showForm)
    }

    return (
        <div className="bg-gray-200 max-h-fit rounded-lg p-6 shadow-md relative">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Manage Category</h1>
                <div className="shadow-md rounded-full h-10 w-10 bg-white text-2xl justify-center items-center flex hover:bg-dark-blue hover:text-white mb-3 cursor-pointer" onClick={toggleAddForm}>
                    <i className="fa-solid fa-plus"></i>
                </div>
            </div>
            <div>
                {getCategory?.map((item) => (
                    <CategoryItem key={item.id} category={item} />
                ))
                }
            </div>
            {showForm && <FormCategory onClose={toggleAddForm} />}
        </div>
    )
}

function CategoryItem({ category }) {

    const { hdlUpdateCategory, hdlDeleteCategory } = useContext(CategoryContext)
    const [isUpdateCategory, setIsUpdateCategory] = useState(false)
    const [updatedCategory, setUpdatedCategory] = useState(category.name)

    const toggleUpdateForm = () => {
        setIsUpdateCategory(!isUpdateCategory);
    }

    const hdlUpdate = () => {
        hdlUpdateCategory(category.id, updatedCategory)
        setIsUpdateCategory(false)
    }

    const hdlDelete = () => {
        hdlDeleteCategory(category.id)
    }

    const cancelUpdate = () => {
        setUpdatedCategory(category.name)
        setIsUpdateCategory(false)
    }

    return (
        <div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                {!isUpdateCategory ? (
                    <div className='flex items-center justify-between'>
                        <h2 className="text-lg font-semibold">{category.name}</h2>
                        <div className="flex gap-3 text-lg text-dark-blue">
                            <i onClick={toggleUpdateForm} className="fa-regular fa-pen-to-square hover:text-blue-300 cursor-pointer"></i>
                            <i onClick={hdlDelete} className="fa-solid fa-trash hover:text-red-600 cursor-pointer"></i>
                        </div>
                    </div>
                ) : (
                    <div className="relative">
                        <input value={updatedCategory} onChange={e => setUpdatedCategory(e.target.value)} className="bg-white h-10 px-3 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" />
                        <div className="absolute top-2 right-2 flex gap-3 text-lg text-dark-blue">
                            <span onClick={hdlUpdate} className="cursor-pointer hover:text-blue-300">Save</span>
                            <span onClick={cancelUpdate} className="cursor-pointer hover:text-red-600">Cancel</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function FormCategory({ onClose }) {

    const { hdlAddNewCategory } = useContext(CategoryContext)
    const [input, setInput] = useState({
        name: ''
    })

    const hdlChange = (e) => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = (e) => {
        e.preventDefault()
        hdlAddNewCategory(input)
        onClose()
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 shadow-lg border-regal-blue border-2 w-80">
                <div className="flex justify-center items-center mb-6 relative">
                    <h1 className="text-2xl font-bold text-dark-blue">Add Category</h1>
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
                    <div className="flex justify-center">
                        <button type="submit" className="bg-regal-blue text-white rounded-lg px-4 py-2 hover:bg-blue-950 hover:text-white">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
