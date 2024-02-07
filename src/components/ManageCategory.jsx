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

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="bg-gray-200 max-h-fit rounded-lg p-6 shadow-md relative">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Manage Category</h1>
                <div className="shadow-md rounded-full h-10 w-10 bg-white text-2xl justify-center items-center flex hover:bg-dark-blue hover:text-white mb-3 cursor-pointer" onClick={toggleForm}>
                    <i className="fa-solid fa-plus"></i>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {getCategory?.map((itemCategory) => (
                    <div key={itemCategory.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                        <h2 className="text-lg font-semibold">{itemCategory.name}</h2>
                        <button>
                            <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                    </div>
                ))}
            </div>
            {showForm && <FormCategory onClose={toggleForm} />}
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
